import "./DashboardCards.css";


function DashboardCards({ oportunidades = [] }) {


  const total = oportunidades.length;



  const lucros = oportunidades.map(op =>
    Number(op.lucro || 0)
  );



  const melhorLucro =
    lucros.length > 0
      ? Math.max(...lucros)
      : 0;



  const lucroMedio =
    lucros.length > 0
      ? lucros.reduce((total, valor) => total + valor, 0) / lucros.length
      : 0;



  const totalInvestido = oportunidades.reduce(

    (total, op) =>
      total + Number(op.valor_investido || 0),

    0

  );



  const retornoTotal = oportunidades.reduce(

    (total, op) =>
      total + Number(op.retorno_final || 0),

    0

  );



  const lucroTotal =
    retornoTotal - totalInvestido;



  const casasMonitoradas = 0;



  return (

    <div className="dashboard">


      <div className="dashboard-card">

        <span>
          Oportunidades
        </span>

        <strong>
          {total}
        </strong>

        <small>
          oportunidades analisadas
        </small>

      </div>




      <div className="dashboard-card">

        <span>
          Surebets
        </span>

        <strong>
          {total}
        </strong>

        <small>
          oportunidades sem risco
        </small>

      </div>




      <div className="dashboard-card destaque">

        <span>
          Melhor lucro
        </span>

        <strong>
          {melhorLucro.toFixed(2)}%
        </strong>

        <small>
          maior retorno encontrado
        </small>

      </div>




      <div className="dashboard-card lucro">

        <span>
          Lucro potencial
        </span>

        <strong>
          R$ {lucroTotal.toFixed(2)}
        </strong>

        <small>
          resultado esperado
        </small>

      </div>




      <div className="dashboard-card">

        <span>
          Capital analisado
        </span>

        <strong>
          R$ {totalInvestido.toFixed(2)}
        </strong>

        <small>
          valor total investido
        </small>

      </div>




      <div className="dashboard-card">

        <span>
          Retorno estimado
        </span>

        <strong>
          R$ {retornoTotal.toFixed(2)}
        </strong>

        <small>
          retorno possível
        </small>

      </div>




      <div className="dashboard-card">

        <span>
          Lucro médio
        </span>

        <strong>
          {lucroMedio.toFixed(2)}%
        </strong>

        <small>
          média das oportunidades
        </small>

      </div>




      <div className="dashboard-card">

        <span>
          Casas monitoradas
        </span>

        <strong>
          {casasMonitoradas}
        </strong>

        <small>
          bookmakers analisadas
        </small>

      </div>



    </div>

  );

}


export default DashboardCards;