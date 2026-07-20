import { useState } from "react";

import OportunidadesLista from "../components/Oportunidades";
import AnaliseModal from "../components/AnaliseModal";


function Oportunidades({ oportunidades }) {

  const [analise, setAnalise] = useState(null);


  return (

    <>

      
      <OportunidadesLista

        oportunidades={oportunidades}

        analisar={(op) => setAnalise(op)}

      />



      <AnaliseModal

        analise={analise}

        fechar={() => setAnalise(null)}

      />


    </>

  );

}


export default Oportunidades;