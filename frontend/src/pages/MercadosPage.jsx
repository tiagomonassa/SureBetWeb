import "./MercadosPage.css";

import {
    useSurebets
} from "../context/SurebetContext";


function MercadosPage(){


    const {

        oportunidades

    } = useSurebets();





    function contarMercado(nome){


        return oportunidades.filter(

            o => o.mercado === nome

        ).length;


    }




    return (

        <div className="mercados-page">





            <div className="section-title">

                <h2>

                    📊 Mercados Monitorados

                </h2>

            </div>







            <div className="mercados-grid">





                <div className="mercado-card mercado-1x2">


                    <h3>

                        🏆 Vencedor da partida

                    </h3>



                    <p>

                        Mercado: 1X2

                    </p>



                    <strong>

                        {contarMercado("h2h")}

                    </strong>



                    <span>

                        oportunidades

                    </span>



                    <div className="mercado-status ativo">

                        ✅ Ativo

                    </div>


                </div>









                <div className="mercado-card mercado-totais">


                    <h3>

                        ⚽ Total de gols

                    </h3>



                    <p>

                        Mercado: Over / Under

                    </p>



                    <strong>

                        {contarMercado("totals")}

                    </strong>



                    <span>

                        oportunidades

                    </span>



                    <div className="mercado-status ativo">

                        ✅ Ativo

                    </div>


                </div>









                <div className="mercado-card mercado-handicap">


                    <h3>

                        🎯 Handicap

                    </h3>



                    <p>

                        Mercado: Spreads

                    </p>



                    <strong>

                        {contarMercado("spreads")}

                    </strong>



                    <span>

                        oportunidades

                    </span>



                    <div className="mercado-status ativo">

                        ✅ Ativo

                    </div>


                </div>









                <div className="mercado-card mercado-corners">


                    <h3>

                        🚩 Escanteios

                    </h3>



                    <p>

                        Mercado: Corners

                    </p>



                    <strong>

                        --

                    </strong>



                    <span>

                        Em desenvolvimento

                    </span>



                    <div className="mercado-status pendente">

                        ⏳ Em breve

                    </div>


                </div>






            </div>








            <div className="section-title">


                <h2>

                    📡 Status dos mercados

                </h2>


            </div>





            <div className="mercado-info">


                O scanner atualmente analisa 1X2, Totais e Handicap.

                <br/><br/>

                Novos mercados serão adicionados conforme evolução do motor.



            </div>






        </div>


    );

}


export default MercadosPage;