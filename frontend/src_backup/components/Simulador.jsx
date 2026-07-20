import { useState } from "react";
import { calcularSurebet } from "../utils/surebet";
import "./Simulador.css";


function Simulador() {


  const [dados, setDados] = useState({

    evento: "",

    campeonato: "",

    oddCasa: "",

    oddEmpate: "",

    oddVisitante: "",

    casaCasa: "Bet365",

    casaEmpate: "Betano",

    casaVisitante: "Sportingbet",

    valor: ""

  });



  const [resultado, setResultado] = useState(null);



  function atualizarCampo(campo, valor) {

    setDados({

      ...dados,

      [campo]: valor

    });

  }




  function calcular() {


    const oddCasa = Number(dados.oddCasa);

    const oddEmpate = Number(dados.oddEmpate);

    const oddVisitante = Number(dados.oddVisitante);

    const valor = Number(dados.valor);



    if (

      !oddCasa ||

      !oddEmpate ||

      !oddVisitante ||

      !valor ||

      oddCasa <= 1 ||

      oddEmpate <= 1 ||

      oddVisitante <= 1

    ) {


      alert("Preencha todas as odds e o valor corretamente.");

      return;

    }




    const resultadoCalculo = calcularSurebet(

      oddCasa,

      oddEmpate,

      oddVisitante,

      valor

    );





    setResultado(resultadoCalculo);


  }





  function salvarOportunidade() {


    if (!resultado || !resultado.ehSurebet) {


      alert(
        "Essa combinação não é uma surebet válida."
      );


      return;

    }




    const oportunidade = {


      evento: dados.evento,


      campeonato: dados.campeonato,


      lucro: Number(resultado.lucro.toFixed(2)),


      valor_investido: Number(dados.valor),


      retorno_final: Number(resultado.retorno.toFixed(2)),




      apostas: [


        {


          resultado: "Vitória Casa",

          casa: dados.casaCasa,

          odd: Number(dados.oddCasa),

          valor: Number(
            resultado.investimentos.casa.toFixed(2)
          )

        },


        {


          resultado: "Empate",

          casa: dados.casaEmpate,

          odd: Number(dados.oddEmpate),

          valor: Number(
            resultado.investimentos.empate.toFixed(2)
          )

        },


        {


          resultado: "Vitória Visitante",

          casa: dados.casaVisitante,

          odd: Number(dados.oddVisitante),

          valor: Number(
            resultado.investimentos.visitante.toFixed(2)
          )

        }


      ]

    };





    fetch(

      "http://127.0.0.1:8000/oportunidades",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(oportunidade)

      }

    )


    .then(res => res.json())


    .then(data => {


      console.log(

        "Salvo:",

        data

      );


      alert(
        "Oportunidade salva com sucesso!"
      );


    })


    .catch(error => {


      console.error(error);


      alert(
        "Erro ao salvar oportunidade"
      );


    });



  }
    return (

    <div className="simulador">


      <h2>
        🧮 Simulador Surebet 2.1
      </h2>



      <input

        placeholder="Evento"

        value={dados.evento}

        onChange={(e) =>
          atualizarCampo(
            "evento",
            e.target.value
          )
        }

      />



      <input

        placeholder="Campeonato"

        value={dados.campeonato}

        onChange={(e) =>
          atualizarCampo(
            "campeonato",
            e.target.value
          )
        }

      />



      <h3>
        🏆 Odds e Casas
      </h3>



      <div>

        <label>
          Vitória Casa
        </label>


        <input

          placeholder="Casa"

          value={dados.casaCasa}

          onChange={(e) =>
            atualizarCampo(
              "casaCasa",
              e.target.value
            )
          }

        />


        <input

          type="number"

          placeholder="Odd"

          value={dados.oddCasa}

          onChange={(e) =>
            atualizarCampo(
              "oddCasa",
              e.target.value
            )
          }

        />

      </div>





      <div>

        <label>
          Empate
        </label>


        <input

          placeholder="Casa"

          value={dados.casaEmpate}

          onChange={(e) =>
            atualizarCampo(
              "casaEmpate",
              e.target.value
            )
          }

        />


        <input

          type="number"

          placeholder="Odd"

          value={dados.oddEmpate}

          onChange={(e) =>
            atualizarCampo(
              "oddEmpate",
              e.target.value
            )
          }

        />

      </div>





      <div>

        <label>
          Vitória Visitante
        </label>


        <input

          placeholder="Casa"

          value={dados.casaVisitante}

          onChange={(e) =>
            atualizarCampo(
              "casaVisitante",
              e.target.value
            )
          }

        />


        <input

          type="number"

          placeholder="Odd"

          value={dados.oddVisitante}

          onChange={(e) =>
            atualizarCampo(
              "oddVisitante",
              e.target.value
            )
          }

        />

      </div>





      <input

        type="number"

        placeholder="Valor investimento"

        value={dados.valor}

        onChange={(e) =>
          atualizarCampo(
            "valor",
            e.target.value
          )
        }

      />





      <button
      className="botao-principal"
  onClick={calcular}
>

        🧮 Calcular Surebet

      </button>






      {
        resultado && (

          <div className="resultado-simulador">


            <h3>
              📊 Resultado da análise
            </h3>




            {

              resultado.ehSurebet ?


              <h2>
                🟢 SUREBET ENCONTRADA
              </h2>


              :


              <h2>
                🔴 NÃO É SUREBET
              </h2>

            }





            <p>
              Probabilidade implícita:
              {" "}
              {resultado.probabilidade.toFixed(2)}%
            </p>





            <p>
              💰 Retorno garantido:
              R$
              {" "}
              {resultado.retorno.toFixed(2)}
            </p>





            <p>
              📈 Lucro:
              {" "}
              {resultado.lucro.toFixed(2)}%
            </p>






            <h3>
              🎯 Distribuição
            </h3>




            <p>

              🏠 {dados.casaCasa}

              <br/>

              Vitória Casa:

              R$
              {" "}
              {resultado.investimentos.casa.toFixed(2)}

            </p>





            <p>

              ⚖️ {dados.casaEmpate}

              <br/>

              Empate:

              R$
              {" "}
              {resultado.investimentos.empate.toFixed(2)}

            </p>





            <p>

              🚩 {dados.casaVisitante}

              <br/>

              Vitória Visitante:

              R$
              {" "}
              {resultado.investimentos.visitante.toFixed(2)}

            </p>





            <button

              className="botao-principal"

              onClick={salvarOportunidade}

              
            >

              💾 Salvar oportunidade

            </button>




          </div>

        )

      }



    </div>

  );


}



export default Simulador;