import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import {
    buscarOportunidades,
    buscarDashboard,
    buscarEsportes,
    buscarConfiguracao
} from "../services/api";



const SurebetContext = createContext();





export function SurebetProvider({children}){



    const [oportunidades,setOportunidades] = useState([]);

    const [oportunidadesFiltradas,setOportunidadesFiltradas] = useState([]);


    const [dashboard,setDashboard] = useState({});


    const [esportes,setEsportes] = useState([]);


    const [carregando,setCarregando] = useState(false);


    const [erro,setErro] = useState(null);


    const [ultimaAtualizacao,setUltimaAtualizacao] = useState(null);


    const [novasSurebets,setNovasSurebets] = useState(0);


    const [novosIds,setNovosIds] = useState([]);





    /*
    ==================================
    CONFIGURAÇÕES SALVAS
    ==================================
    */



    const [banca,setBanca] = useState(()=>{


        const salva = localStorage.getItem("banca");


        return salva

        ? Number(salva)

        : 1000;


    });







    const [lucroMinimo,setLucroMinimo] = useState(()=>{


        const salva = localStorage.getItem("lucroMinimo");


        return salva

        ? Number(salva)

        : 0;


    });








    const [intervalo,setIntervalo] = useState(()=>{


        const salva = localStorage.getItem("intervalo");


        return salva

        ? Number(salva)

        : 15;


    });








    const [mercados,setMercados] = useState(()=>{


        const salva = localStorage.getItem("mercados");



        return salva


        ? JSON.parse(salva)



        :


        {


            h2h:true,


            totals:true,


            spreads:true,


            corners:false



        };



    });









    const [filtros,setFiltros] = useState({


        busca:"",


        esporte:"Todos",


        mercado:"Todos",


        lucroMinimo:0,


        casa:"Todos"


    });









    /*
    ==================================
    SALVAR CONFIGURAÇÕES
    ==================================
    */


    useEffect(()=>{


        localStorage.setItem(

            "banca",

            banca

        );


    },[banca]);







    useEffect(()=>{


        localStorage.setItem(

            "lucroMinimo",

            lucroMinimo

        );


    },[lucroMinimo]);







    useEffect(()=>{


        localStorage.setItem(

            "intervalo",

            intervalo

        );


    },[intervalo]);







    useEffect(()=>{


        localStorage.setItem(

            "mercados",

            JSON.stringify(mercados)

        );


    },[mercados]);


    async function carregarDados(){



        try{



            setCarregando(true);





            const [
                oportunidadesData,
                dashboardData,
                esportesData,
                configData
            ] = await Promise.all([

                buscarOportunidades(),

                buscarDashboard(),

                buscarEsportes(),

                buscarConfiguracao()



            ]);









            const lista = Array.isArray(oportunidadesData)

            ?

            oportunidadesData

            :

            [];








            const antigos = new Set(

                oportunidades.map(o=>o.id)

            );







            const novos = lista

            .filter(o=>!antigos.has(o.id))

            .map(o=>o.id);







            setNovasSurebets(novos.length);


            setNovosIds(novos);








            setOportunidades(lista);

            console.log("OPORTUNIDADES RECEBIDAS:", lista);






            setDashboard(
    dashboardData || {}
);


// ==================================
// ATUALIZA CONFIGURAÇÃO DA BANCA
// VINDO DO BANCO
// ==================================

if (configData) {


    setBanca(
        configData.valor_total
    );


    setLucroMinimo(
        configData.lucro_minimo
    );


    setIntervalo(
        configData.intervalo_scan
    );


}








            setEsportes(


                Array.isArray(esportesData)

                ?

                esportesData

                :

                []

            );








            setUltimaAtualizacao(

                new Date()

            );





        }

        catch(error){



            console.error(error);



            setErro(

                "Erro ao carregar dados"

            );


        }

        finally{


            setCarregando(false);


        }


    }









    function atualizarFiltros(novosFiltros){


        setFiltros({

            ...filtros,

            ...novosFiltros

        });


    }









    useEffect(()=>{


        carregarDados();





        const timer = setInterval(()=>{


            carregarDados();



        },15000);






        return ()=>clearInterval(timer);




    },[]);









    useEffect(()=>{



        let resultado = [

            ...oportunidades

        ];







        if(filtros.busca){



            resultado = resultado.filter(o=>


                o.evento

                ?.toLowerCase()

                .includes(

                    filtros.busca.toLowerCase()

                )


            );

        }








        if(filtros.mercado !== "Todos"){



            resultado = resultado.filter(o=>


                o.mercado === filtros.mercado


            );


        }








        if(filtros.lucroMinimo > 0){



            resultado = resultado.filter(o=>


                Number(

                    o.lucro_percentual || 0

                )

                >=

                filtros.lucroMinimo


            );


        }








        if(filtros.casa !== "Todos"){



            resultado = resultado.filter(o=>



                Array.isArray(o.apostas)

                &&

                o.apostas.some(

                    a=>a.casa === filtros.casa

                )


            );


        }








        resultado.sort((a,b)=>


            Number(

                b.lucro_percentual || 0

            )

            -

            Number(

                a.lucro_percentual || 0

            )


        );







        setOportunidadesFiltradas(resultado);
        
        console.log("FILTRADAS:", resultado);





    },[

        oportunidades,

        filtros

    ]);











    return(



        <SurebetContext.Provider


        value={{




            oportunidades,


            oportunidadesFiltradas,



            dashboard,



            esportes,



            carregando,



            erro,



            atualizar:carregarDados,



            ultimaAtualizacao,



            novasSurebets,



            novosIds,



            filtros,



            atualizarFiltros,





            banca,

            setBanca,



            lucroMinimo,

            setLucroMinimo,



            intervalo,

            setIntervalo,



            mercados,

            setMercados




        }}



        >


            {children}



        </SurebetContext.Provider>



    );


}








export function useSurebets(){



    return useContext(SurebetContext);



}