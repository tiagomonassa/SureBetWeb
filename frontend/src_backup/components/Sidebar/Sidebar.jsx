import "./Sidebar.css";


function Sidebar({ pagina, setPagina }) {


  const menus = [


    {
      id: "dashboard",
      icone: "📊",
      titulo: "Dashboard",
    },


    {
      id: "oportunidades",
      icone: "🔥",
      titulo: "Oportunidades",
    },


    {
      id: "odds",
      icone: "📡",
      titulo: "Odds Reais",
    },


    {
      id: "scanner",
      icone: "🔍",
      titulo: "Scanner",
    },


    {
      id: "simulador",
      icone: "🧮",
      titulo: "Simulador",
    },


    {
      id: "historico",
      icone: "📈",
      titulo: "Histórico",
    },


    {
      id: "configuracoes",
      icone: "⚙️",
      titulo: "Configurações",
    },


  ];






  return (


    <aside className="sidebar">



      <div className="logo">


        <h2>SH</h2>


        <span>
          SureHunter
        </span>


      </div>







      <nav>


        {menus.map((menu) => (



          <button


            key={menu.id}


            className={

              `menu ${
                pagina === menu.id
                ? "active"
                : ""
              }`

            }


            onClick={() => setPagina(menu.id)}


          >



            <span className="menu-icone">


              {menu.icone}


            </span>





            {menu.titulo}




          </button>



        ))}



      </nav>





    </aside>



  );


}



export default Sidebar;