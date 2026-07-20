import { useEffect, useState } from "react";

import { getScannerLogs } from "../../services/api";

import "./ScannerMonitor.css";


function ScannerMonitor() {


    const [logs, setLogs] = useState([]);

    const [online, setOnline] = useState(false);





    async function carregarLogs(){


        try{


            const dados = await getScannerLogs();


            setLogs(dados);


            setOnline(true);



        }catch(error){


            console.error(
                "Erro ao carregar logs do scanner:",
                error
            );


            setOnline(false);


        }


    }







    useEffect(()=>{


        carregarLogs();



        const intervalo = setInterval(()=>{


            carregarLogs();



        },10000);



        return ()=>clearInterval(intervalo);



    },[]);







    const ultimoLog = logs.length > 0

        ? logs[0]

        : null;







    return (


        <div className="scanner-monitor">





            <div className="monitor-header">



                <div className="scanner-title">


                    <span>
                        📊
                    </span>


                    <h3>
                        Monitor do Scanner
                    </h3>


                </div>





                <div className="scanner-status">


                    <span

                        className={
                            online
                                ? "status-dot online"
                                : "status-dot offline"
                        }

                    ></span>



                    {

                        online

                            ? "Scanner Online"

                            : "Scanner Offline"

                    }



                </div>



            </div>









            {!ultimoLog && (


                <div className="empty-scanner">


                    Aguardando primeira execução do scanner...


                </div>


            )}









            {ultimoLog && (


                <div className="scanner-info">







                    <div className="info-card">


                        <span>

                            ⏱️ Última execução

                        </span>


                        <strong>


                            {
                                new Date(
                                    ultimoLog.data_execucao
                                ).toLocaleString()
                            }


                        </strong>


                    </div>









                    <div className="info-card">


                        <span>

                            📡 Odds analisadas

                        </span>


                        <strong>

                            {ultimoLog.odds_encontradas}

                        </strong>


                    </div>









                    <div className="info-card">


                        <span>

                            🎯 Oportunidades

                        </span>


                        <strong>

                            {ultimoLog.oportunidades_encontradas}

                        </strong>


                    </div>









                    <div className="info-card">


                        <span>

                            💾 Oportunidades salvas

                        </span>


                        <strong>

                            {ultimoLog.oportunidades_salvas}

                        </strong>


                    </div>









                    <div className="info-card">


                        <span>

                            ⚡ Tempo execução

                        </span>


                        <strong>

                            {ultimoLog.tempo_execucao}

                        </strong>


                    </div>





                </div>


            )}









            {ultimoLog?.erro && (


                <div className="scanner-error">


                    ⚠️ Erro:

                    {" "}

                    {ultimoLog.erro}



                </div>


            )}









            <div className="scanner-history">





                <h3>

                    Últimas execuções

                </h3>









                {logs.slice(0,10).map((log)=>(



                    <div

                        className="scanner-row"

                        key={log.id}

                    >





                        <span>


                            {
                                new Date(
                                    log.data_execucao
                                ).toLocaleTimeString()
                            }


                        </span>







                        <span>


                            📡 {log.odds_encontradas}


                        </span>







                        <span>


                            🎯 {log.oportunidades_encontradas}


                        </span>







                        <span>


                            💾 {log.oportunidades_salvas}


                        </span>





                    </div>



                ))}





            </div>






        </div>


    );


}


export default ScannerMonitor;