import "./ConfigPage.css";

import { useEffect, useState } from "react";

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


    const [salvo,setSalvo] = useState(false);



    useEffect(()=>{


        carregarConfig();


    },[]);



    async function carregarConfig(){


        try{


            const resposta = await buscarConfiguracao();


            setBanca(resposta.data.valor_total);


            setLucroMinimo(
                resposta.data.lucro_minimo
            );


            setIntervalo(
                resposta.data.intervalo_scan
            );


            const lista = resposta.data.mercados.split(",");


            setMercados({

                h2h: lista.includes("h2h"),

                totals: lista.includes("totals"),

                spreads: lista.includes("spreads"),

                corners:false

            });



        }catch(error){

            console.log(
                "Erro ao carregar configuração",
                error
            );

        }


    }




    async function salvarConfig(){


        try{


            const ativos = Object.keys(mercados)
                .filter(
                    item => mercados[item]
                )
                .join(",");


            await salvarConfiguracao({

                valor_total:banca,

                lucro_minimo:lucroMinimo,

                sport_key:"soccer_epl",

                mercados:ativos,

                intervalo_scan:intervalo

                }
            );



            setSalvo(true);



            setTimeout(()=>{

                setSalvo(false);

            },2000);



        }catch(error){


            console.log(
                "Erro ao salvar",
                error
            );


        }


    }





    function alternar(nome){


        setMercados({

            ...mercados,

            [nome]:!mercados[nome]

        });


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

                        onChange={
                            e =>
                            setBanca(
                                Number(
                                    e.target.value
                                )
                            )
                        }

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

                        onChange={
                            e =>
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

                        onChange={
                            e =>
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

                        onChange={
                            ()=>alternar("h2h")
                        }

                    />

                    🏆 1X2

                </label>





                <label>

                    <input

                        type="checkbox"

                        checked={mercados.totals}

                        onChange={
                            ()=>alternar("totals")
                        }

                    />

                    ⚽ Totais

                </label>





                <label>

                    <input

                        type="checkbox"

                        checked={mercados.spreads}

                        onChange={
                            ()=>alternar("spreads")
                        }

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
                className="save-button"
                onClick={salvarConfig}
            >

                💾 Salvar Configuração

            </button>



            {

                salvo &&

                <p>

                    ✅ Configuração salva

                </p>

            }



        </div>


    );


}


export default ConfigPage;