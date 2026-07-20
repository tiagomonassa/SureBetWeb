import { useEffect, useState } from "react";

import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import Filtros from "./components/Filtros";
import OportunidadeCard from "./components/OportunidadeCard";
import AnaliseModal from "./components/AnaliseModal";

import "./App.css";



function App() {


  const [oportunidades, setOportunidades] = useState([]);

  const [analise, setAnalise] = useState(null);

  const [busca, setBusca] = useState("");




  function carregarOportunidades() {


    fetch("http://127.0.0.1:8000/oportunidades")

      .then(res => res.json())

      .then(data => {

        console.log(
          "Oportunidades carregadas:",
          data
        );

        setOportunidades(data);

      })

      .catch(error => {

        console.error(
          "Erro ao carregar oportunidades:",
          error
        );

      });


  }





  function buscarNovas() {


    fetch("http://127.0.0.1:8000/buscar")

      .then(res => res.json())

      .then(() => {

        carregarOportunidades();

      })

      .catch(error => {

        console.error(
          "Erro na busca:",
          error
        );

      });


  }





  useEffect(() => {

    carregarOportunidades();

  }, []);





  const oportunidadesFiltradas = oportunidades

    .filter(op =>

      (op.evento || "")

        .toLowerCase()

        .includes(
          busca.toLowerCase()
        )

    )

    .sort((a,b) =>

      Number(b.lucro || 0)

      -

      Number(a.lucro || 0)

    );






  return (

    <div
      className="container"
    >



      <Header
        atualizar={buscarNovas}
      />



      <DashboardCards

        oportunidades={oportunidades}

      />




      <Filtros

        busca={busca}

        setBusca={setBusca}

      />




      <h2>
        Oportunidades encontradas
      </h2>





      {
        oportunidadesFiltradas.length === 0 && (

          <p>
            Nenhuma oportunidade encontrada.
          </p>

        )
      }





      {
        oportunidadesFiltradas.map((op,index)=>(


          <OportunidadeCard

            key={op.id}

            op={op}

            index={index}

            analisar={setAnalise}

          />


        ))
      }






      <AnaliseModal

        analise={analise}

        fechar={() => setAnalise(null)}

      />




    </div>

  );


}



export default App;