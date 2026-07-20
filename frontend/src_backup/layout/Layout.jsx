import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import SystemStatus from "../components/SystemStatus";

import "./Layout.css";


function Layout({ children, pagina, setPagina }) {


  return (

    <div className="layout">


      <Header />



      <SystemStatus />



      <div className="layout-body">


        <Sidebar

          pagina={pagina}

          setPagina={setPagina}

        />



        <main className="content">

          {children}

        </main>


      </div>


    </div>

  );

}


export default Layout;