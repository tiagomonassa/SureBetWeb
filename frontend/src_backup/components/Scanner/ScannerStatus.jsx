import { useEffect, useState } from "react";

import { getScannerDashboard } from "../../services/api";

import "./ScannerStatus.css";



function ScannerStatus() {


    const [dados, setDados] = useState(null);

    const [online, setOnline] = useState(false);




    async function carregarDashboard(){


        try{


            const resposta = await getScannerDashboard();


            setDados(resposta);


            setOnline(true);



        }catch(error){


            console.error(
                "Erro ao carregar dashboard do scanner:",
                error
            );


            setOnline(false);


        }


    }






    useEffect(()=>{


        carregarDashboard();



        const intervalo = setInterval(()=>{


            carregarDashboard();


        },30000);



        return ()=>clearInterval(intervalo);



    },[]);







    return (


        <div className="scanner-status">



            <div className="scanner-title">


                <span>
                    📡
                </span>


                <h3>
                    Status do Scanner
                </h3>


            </div>







            <div className="status-grid">





                <div className="status-card">


                    <span>Status</span>


                    <strong className={online ? "online" : ""}>


                        {online
                            ? "🟢 Online"
                            : "🔴 Offline"
                        }


                    </strong>


                </div>








                <div className="status-card">

                    <span>
                        Ciclos executados
                    </span>

                    <strong>
                        {dados?.ciclos_executados ?? "--"}
                    </strong>

                </div>








                <div className="status-card">

                    <span>
                        Odds analisadas
                    </span>

                    <strong>
                        {dados?.odds_analisadas ?? "--"}
                    </strong>

                </div>








                <div className="status-card">

                    <span>
                        Surebets encontradas
                    </span>

                    <strong>
                        {dados?.oportunidades_encontradas ?? "--"}
                    </strong>

                </div>








                <div className="status-card">

                    <span>
                        Oportunidades salvas
                    </span>

                    <strong>
                        {dados?.oportunidades_salvas ?? "--"}
                    </strong>

                </div>








                <div className="status-card">

                    <span>
                        Erros
                    </span>

                    <strong>
                        {dados?.erros ?? "--"}
                    </strong>

                </div>





            </div>



        </div>


    );


}



export default ScannerStatus;