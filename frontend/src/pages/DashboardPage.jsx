import "./DashboardPage.css";


import Dashboard from "../components/Dashboard/Dashboard";


import FiltrosPremium from "../components/Filters/FiltrosPremium";


import SurebetTable from "../components/SurebetTable/SurebetTable";


import { useSurebets } from "../context/SurebetContext";



function DashboardPage(){


    const {

        oportunidadesFiltradas,

        carregando


    } = useSurebets();





    return (


        <div className="dashboard-page">



            {/* FILTROS NO TOPO DO DASHBOARD */}

            <FiltrosPremium />





            {/* CARDS */}

            <Dashboard />






            <div className="section-title">


                <h2>

                    🎯 Surebets Encontradas

                </h2>



                {

                    carregando &&

                    <span>

                        Atualizando...

                    </span>

                }


            </div>





            {/* TABELA */}

            <SurebetTable

                oportunidades={

                    oportunidadesFiltradas

                }

            />



        </div>


    );

}



export default DashboardPage;