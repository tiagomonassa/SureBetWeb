import "./Dashboard.css";


function Dashboard() {

  const cards = [
    {
      titulo: "Oportunidades",
      valor: "0"
    },
    {
      titulo: "Maior Lucro",
      valor: "0%"
    },
    {
      titulo: "Eventos",
      valor: "0"
    },
    {
      titulo: "Casas",
      valor: "0"
    }
  ];


  return (

    <section className="dashboard">


      {cards.map((card, index) => (

        <div
          className="dashboard-card"
          key={index}
        >

          <h4>
            {card.titulo}
          </h4>


          <p>
            {card.valor}
          </p>


        </div>

      ))}


    </section>

  );

}


export default Dashboard;