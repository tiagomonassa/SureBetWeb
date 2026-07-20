import { useState } from "react";

import DashboardCards from "../components/DashboardCards";
import Filtros from "../components/Filtros";
import Oportunidades from "../components/Oportunidades";
import AnaliseModal from "../components/AnaliseModal";

function Dashboard({ oportunidades }) {
  const [busca, setBusca] = useState("");
  const [lucroMinimo, setLucroMinimo] = useState(0);
  const [analise, setAnalise] = useState(null);

  const oportunidadesFiltradas = oportunidades.filter((op) => {
    const evento = op.evento ? op.evento.toLowerCase() : "";
    const campeonato = op.campeonato
      ? op.campeonato.toLowerCase()
      : "";

    const termoBusca = busca.toLowerCase();

    const correspondeBusca =
      evento.includes(termoBusca) ||
      campeonato.includes(termoBusca);

    const correspondeLucro =
      Number(op.lucro || 0) >= lucroMinimo;

    return correspondeBusca && correspondeLucro;
  });

  return (
    <>
      <Filtros
        busca={busca}
        setBusca={setBusca}
        lucroMinimo={lucroMinimo}
        setLucroMinimo={setLucroMinimo}
      />

      <DashboardCards
        oportunidades={oportunidades}
      />

      <Oportunidades
        oportunidades={oportunidadesFiltradas}
        analisar={(op) => setAnalise(op)}
      />

      <AnaliseModal
        analise={analise}
        fechar={() => setAnalise(null)}
      />
    </>
  );
}

export default Dashboard;