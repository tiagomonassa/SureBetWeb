import { useEffect } from "react";

import "./AnaliseModal.css";


function AnaliseModal({ analise, fechar }) {


  useEffect(() => {


    function pressionarTecla(event) {


      if (event.key === "Escape") {

        fechar();

      }


    }



    if (analise) {

      document.addEventListener(
        "keydown",
        pressionarTecla
      );

    }



    return () => {

      document.removeEventListener(
        "keydown",
        pressionarTecla
      );

    };


  }, [analise, fechar]);





  if (!analise) {

    return null;

  }





  return (

    <div

      className="modal-overlay"

      onClick={fechar}

    >



      <div

        className="modal-container"

        onClick={(e) => e.stopPropagation()}

      >



        <h2>
          📊 Análise da oportunidade
        </h2>




        <div className="modal-info">


          <h3>
            🔥 {analise.evento}
          </h3>



          <p>

            🏆 Campeonato:

            <strong>
              {" "}
              {analise.campeonato}
            </strong>

          </p>




          <p>

            💰 Valor investido:

            <strong>

              {" "}
              R$ {Number(
                analise.valor_investido || 0
              ).toFixed(2)}

            </strong>

          </p>




          <p>

            📈 Retorno final:

            <strong>

              {" "}
              R$ {Number(
                analise.retorno_final || 0
              ).toFixed(2)}

            </strong>

          </p>




          <p>

            ✅ Lucro garantido:

            <strong>

              {" "}
              {Number(
                analise.lucro || 0
              ).toFixed(2)}%

            </strong>

          </p>



        </div>





        <hr />





        <h3 className="titulo-apostas">

          🎯 Distribuição das apostas

        </h3>





        {

          analise.apostas && analise.apostas.length > 0 ?


          analise.apostas.map((aposta) => (


            <div

              key={aposta.id}

              className="aposta-card"

            >


              <h4>

                {
                  aposta.resultado === "Vitória Casa"
                  && "🏠 "
                }


                {
                  aposta.resultado === "Empate"
                  && "⚖️ "
                }


                {
                  aposta.resultado === "Vitória Visitante"
                  && "🚩 "
                }


                {aposta.resultado}


              </h4>





              <p>

                🏦 Casa:

                <strong>
                  {" "}
                  {aposta.casa}
                </strong>

              </p>





              <p>

                Odd:

                <strong>
                  {" "}
                  {aposta.odd}
                </strong>

              </p>





              <p>

                💰 Investimento:

                <strong>

                  {" "}
                  R$ {Number(
                    aposta.valor || 0
                  ).toFixed(2)}

                </strong>

              </p>



            </div>


          ))


          :


          <p>
            Nenhuma aposta cadastrada.
          </p>


        }





        <button

          className="botao-fechar"

          onClick={fechar}

        >

          Fechar

        </button>




      </div>



    </div>

  );

}


export default AnaliseModal;