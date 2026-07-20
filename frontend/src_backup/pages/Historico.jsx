import { useEffect, useState } from "react";

import AnaliseModal from "../components/AnaliseModal";

import "./Historico.css";


function Historico() {


  const [historico, setHistorico] = useState([]);

  const [analise, setAnalise] = useState(null);




  function carregarHistorico() {


    fetch("http://127.0.0.1:8000/historico")


      .then((res) => res.json())


      .then((data) => {

        setHistorico(data);

      })


      .catch((error) => {

        console.error(
          "Erro ao carregar histórico:",
          error
        );

      });


  }





  useEffect(() => {

    carregarHistorico();

  }, []);





  const totalInvestido = historico.reduce(

    (total, item) =>

      total + Number(item.valor_investido || 0),

    0

  );





  const retornoTotal = historico.reduce(

    (total, item) =>

      total + Number(item.retorno_final || 0),

    0

  );





  const lucroTotal = retornoTotal - totalInvestido;





  return (

    <div className="historico">


      <h1 className="titulo-pagina">
        📈 Histórico de Análises
      </h1>





      <div className="historico-resumo">


        <div className="resumo-card">

          <span>
            📊 Análises
          </span>

          <strong>
            {historico.length}
          </strong>

        </div>




        <div className="resumo-card">

          <span>
            💰 Investido
          </span>

          <strong>
            R$ {totalInvestido.toFixed(2)}
          </strong>

        </div>




        <div className="resumo-card">

          <span>
            🚀 Retorno
          </span>

          <strong>
            R$ {retornoTotal.toFixed(2)}
          </strong>

        </div>




        <div className="resumo-card lucro">

          <span>
            📈 Lucro
          </span>

          <strong>
            R$ {lucroTotal.toFixed(2)}
          </strong>

        </div>


      </div>






      {


        historico.length === 0 ?


        (

          <div className="historico-vazio">

            <h3>
              Nenhum registro encontrado
            </h3>

          </div>

        )


        :


        historico.map((item)=>(


          <div

            className="historico-card"

            key={item.id}

          >



            <div className="historico-header">


              <h2>
                🔥 {item.evento}
              </h2>



              <span>

                +{Number(
                  item.lucro
                ).toFixed(2)}%

              </span>


            </div>





            <p>

              🏆 Campeonato:

              <strong>
                {item.campeonato}
              </strong>

            </p>





            <p>

              📅 Data:

              <strong>

                {new Date(
                  item.data
                ).toLocaleString()}

              </strong>

            </p>





            <div className="financeiro">


              <p>

                💰 Investido

                <strong>
                  R$ {Number(
                    item.valor_investido
                  ).toFixed(2)}
                </strong>

              </p>




              <p>

                🚀 Retorno

                <strong>
                  R$ {Number(
                    item.retorno_final
                  ).toFixed(2)}
                </strong>

              </p>


            </div>





            <button

              className="botao-analise"

              onClick={() => setAnalise(item)}

            >

              📊 Ver análise

            </button>




          </div>


        ))

      }





      <AnaliseModal

        analise={analise}

        fechar={() => setAnalise(null)}

      />


    </div>

  );

}


export default Historico;