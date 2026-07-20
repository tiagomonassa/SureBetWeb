import { useEffect, useState } from "react";

import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard";
import Oportunidades from "./pages/Oportunidades";
import Odds from "./pages/Odds";
import Scanner from "./pages/Scanner";
import Simulador from "./pages/Simulador";
import Historico from "./pages/Historico";
import Configuracoes from "./pages/Configuracoes";


import {
  getOportunidades
} from "./services/api";



function App() {


  const [pagina, setPagina] = useState("dashboard");


  const [oportunidades, setOportunidades] = useState([]);


  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);






  async function carregarOportunidades() {


    try {


      const data = await getOportunidades();


      setOportunidades(data);



      setUltimaAtualizacao(

        new Date()

      );



    } catch (error) {


      console.error(

        "Erro ao carregar oportunidades:",

        error

      );


    }


  }








  useEffect(() => {


    carregarOportunidades();



    const intervalo = setInterval(() => {


      carregarOportunidades();



    }, 10000);




    return () => clearInterval(intervalo);



  }, []);









  function renderPagina() {


    switch (pagina) {



      case "dashboard":

        return (

          <Dashboard

            oportunidades={oportunidades}

            ultimaAtualizacao={ultimaAtualizacao}

          />

        );







      case "oportunidades":

        return (

          <Oportunidades

            oportunidades={oportunidades}

          />

        );







      case "odds":

        return (

          <Odds />

        );







      case "scanner":

        return (

          <Scanner

            atualizar={carregarOportunidades}

          />

        );







      case "simulador":

        return (

          <Simulador />

        );







      case "historico":

        return (

          <Historico />

        );







      case "configuracoes":

        return (

          <Configuracoes />

        );







      default:

        return (

          <Dashboard

            oportunidades={oportunidades}

            ultimaAtualizacao={ultimaAtualizacao}

          />

        );



    }


  }









  return (


    <Layout

      pagina={pagina}

      setPagina={setPagina}

    >


      <div className="page">


        {renderPagina()}


      </div>


    </Layout>


  );


}



export default App;