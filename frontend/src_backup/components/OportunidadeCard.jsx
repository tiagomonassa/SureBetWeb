import "./OportunidadeCard.css";



function OportunidadeCard({ op, index, analisar }) {


  return (

    <div className="card-oportunidade">


      <h3>

        🔥 {op.evento || `Surebet #${index + 1}`}

      </h3>




      <p>

        🏆 Campeonato:

        <strong>

          {op.campeonato || "Não informado"}

        </strong>

      </p>





      <p>

        💰 Investimento:

        <strong>

          R$ {Number(op.valor_investido || 0).toFixed(2)}

        </strong>

      </p>





      <p>

        📈 Retorno:

        <strong>

          R$ {Number(op.retorno_final || 0).toFixed(2)}

        </strong>

      </p>





      <p>

        ✅ Lucro:

        <strong className="lucro">

          {Number(op.lucro || 0).toFixed(2)}%

        </strong>

      </p>





      <button

        onClick={() => analisar(op)}

      >

        📊 Analisar

      </button>




    </div>

  );


}


export default OportunidadeCard;