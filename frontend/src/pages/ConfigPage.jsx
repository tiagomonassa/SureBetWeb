import "./ConfigPage.css";

import { useState, useEffect } from "react";

import { useSurebets } from "../context/SurebetContext";

import {
    buscarConfiguracao,
    salvarConfiguracao
} from "../services/api";



function ConfigPage(){


    const {

        banca,

        setBanca


    } = useSurebets();



    const [lucroMinimo,setLucroMinimo] = useState(0);


    const [intervalo,setIntervalo] = useState(15);



    const [mercados,setMercados] = useState({


        h2h:true,


        totals:true,


        spreads:true,


        corners:false


    });



    useEffect(() => {


        async function carregarConfig(){


            try {


                const config = await buscarConfiguracao();



                setBanca(config.valor_total);



                setLucroMinimo(config.lucro_minimo);



                setIntervalo(config.intervalo_scan);



                const listaMercados =
                    config.mercados.split(",");



                setMercados({


                    h2h:
                        listaMercados.includes("h2h"),



                    totals:
                        listaMercados.includes("totals"),



                    spreads:
                        listaMercados.includes("spreads"),



                    corners:false


                });



            } catch(error){


                console.log(
                    "Erro ao carregar configuração",
                    error
                );


            }


        }



        carregarConfig();



    }, []);







    function alternar(nome){


        setMercados({


            ...mercados,


            [nome]:
                !mercados[nome]


        });


    }









    async function salvar(){


        try {


            await salvarConfiguracao({


                valor_total:
                    Number(banca),



                lucro_minimo:
                    Number(lucroMinimo),



                sport_key:
                    "soccer_epl",



                mercados:

                    Object.keys(mercados)

                    .filter(

                        mercado =>
                            mercados[mercado]

                    )

                    .join(","),



                intervalo_scan:
                    Number(intervalo)


            });



            alert(
                "Configuração salva!"
            );



        } catch(error){


            console.log(
                "Erro ao salvar configuração",
                error
            );


            alert(
                "Erro ao salvar configuração"
            );


        }


    }









    return (


        <div className="config-page">



            <div className="section-title">


                <h2>

                    ⚙️ Configurações do Sistema

                </h2>


            </div>







            <div className="config-grid">



                <div className="config-card">


                    <h3>

                        💰 Gestão da banca

                    </h3>



                    <label>

                        Valor padrão

                    </label>



                    <input


                        type="number"


                        value={banca}



                        onChange={(e)=>{


                            const valor =
                                e.target.value;



                            if(valor===""){


                                setBanca("");

                                return;


                            }



                            setBanca(
                                Number(valor)
                            );


                        }}



                    />



                    <small>

                        Valor usado nos cálculos

                    </small>



                </div>









                <div className="config-card">


                    <h3>

                        📈 Filtro de oportunidades

                    </h3>



                    <label>

                        Lucro mínimo (%)

                    </label>



                    <input


                        type="number"


                        value={lucroMinimo}



                        onChange={(e)=>


                            setLucroMinimo(

                                Number(
                                    e.target.value
                                )

                            )

                        }



                    />



                </div>









                <div className="config-card">


                    <h3>

                        🔄 Atualização

                    </h3>



                    <label>

                        Intervalo do sistema

                    </label>



                    <input


                        type="number"


                        value={intervalo}



                        onChange={(e)=>


                            setIntervalo(

                                Number(
                                    e.target.value
                                )

                            )

                        }



                    />



                    <small>

                        segundos

                    </small>



                </div>




            </div>









            <div className="config-card mercados-card">



                <h3>

                    📊 Mercados ativos

                </h3>





                <label>


                    <input


                        type="checkbox"


                        checked={mercados.h2h}


                        onChange={()=>alternar("h2h")}


                    />


                    🏆 1X2


                </label>







                <label>


                    <input


                        type="checkbox"


                        checked={mercados.totals}


                        onChange={()=>alternar("totals")}


                    />


                    ⚽ Totais


                </label>







                <label>


                    <input


                        type="checkbox"


                        checked={mercados.spreads}


                        onChange={()=>alternar("spreads")}


                    />


                    🎯 Handicap


                </label>







                <label>


                    <input


                        type="checkbox"


                        disabled


                    />


                    🚩 Escanteios (em breve)


                </label>



            </div>








            <button

                className="btn-salvar"

                onClick={salvar}

            >

                💾 Salvar Configuração


            </button>





        </div>


    );


}



export default ConfigPage;