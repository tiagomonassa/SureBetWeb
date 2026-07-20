import "./ScannerPage.css";

import {
    useSurebets
} from "../context/SurebetContext";


function ScannerPage(){


    const {

        oportunidades,

        carregando,

        ultimaAtualizacao,

        atualizar


    } = useSurebets();





    function formatarData(){


        if(!ultimaAtualizacao)

            return "--";



        return ultimaAtualizacao.toLocaleString(
            "pt-BR"
        );


    }





    return (


        <div className="scanner-page">



            <div className="section-title">


                <h2>

                    🔎 Scanner Automático

                </h2>



                {

                carregando &&

                <span>

                    Analisando...

                </span>

                }


            </div>







            <div className="scanner-grid">





                <div className="scanner-card">


                    <span>

                        Status

                    </span>


                    <strong className="online">

                        🟢 Online

                    </strong>


                </div>






                <div className="scanner-card">


                    <span>

                        Oportunidades

                    </span>


                    <strong>

                        {oportunidades.length}

                    </strong>


                </div>







                <div className="scanner-card">


                    <span>

                        Última atualização

                    </span>


                    <strong>

                        {formatarData()}

                    </strong>


                </div>





            </div>







            <button

                className="scanner-btn"

                onClick={atualizar}

            >

                🔄 Executar Scanner Agora

            </button>





            <div className="scanner-info">


                <h3>

                    📡 Monitoramento

                </h3>



                <p>

                    O sistema atualiza automaticamente a cada 15 segundos.

                </p>


                <p>

                    As oportunidades encontradas aparecem automaticamente no Dashboard.

                </p>


            </div>





        </div>


    );


}


export default ScannerPage;