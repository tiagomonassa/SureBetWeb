import SurebetTable from "../components/SurebetTable/SurebetTable";

import { useSurebets } from "../context/SurebetContext";


function SurebetsPage(){


    const {

        oportunidadesFiltradas

    } = useSurebets();




    return (

        <SurebetTable

            oportunidades={oportunidadesFiltradas}

        />

    );


}


export default SurebetsPage;