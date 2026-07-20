import "./Dashboard.css";

import { useSurebets } from "../../context/SurebetContext";



function Dashboard(){


    const {

        oportunidadesFiltradas = [],

        banca = 1000

    } = useSurebets();






    const total = oportunidadesFiltradas.length;







    const melhorLucro = total > 0


        ? Math.max(


            ...oportunidadesFiltradas.map(


                item => Number(

                    item.lucro_percentual || 0

                )


            )


        )


        : 0;








    const investimento = Number(banca);





    const lucro =

        investimento *

        (melhorLucro / 100);






    const retorno =

        investimento +

        lucro;









    function moeda(valor){


        return Number(valor || 0)

        .toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );


    }







    return (



        <div className="dashboard-cards">





            <div className="dashboard-card">


                <span>

                    🎯 Surebets Encontradas

                </span>


                <strong>

                    {total}

                </strong>


            </div>







            <div className="dashboard-card">


                <span>

                    🚀 Melhor Lucro

                </span>


                <strong className="green">

                    {melhorLucro.toFixed(2)}%

                </strong>


            </div>







            <div className="dashboard-card">


                <span>

                    💵 Investimento

                </span>


                <strong>

                    {moeda(investimento)}

                </strong>


            </div>







            <div className="dashboard-card">


                <span>

                    📈 Retorno Possível

                </span>


                <strong>

                    {moeda(retorno)}

                </strong>


            </div>







            <div className="dashboard-card lucro">


                <span>

                    💰 Lucro Acumulado

                </span>


                <strong className="green">

                    {moeda(lucro)}

                </strong>


            </div>





        </div>


    );


}



export default Dashboard;