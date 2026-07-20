import "./Scanner.css";

import ScannerButton from "../components/Scanner/ScannerButton";
import ScannerMonitor from "../components/Scanner/ScannerMonitor";
import ScannerStatus from "../components/Scanner/ScannerStatus";


function Scanner({ atualizar }) {


  return (

    <div className="scanner-page">


      <h1>
        Scanner
      </h1>


      <p>
        Controle e monitoramento do scanner de oportunidades.
      </p>



      <ScannerButton
        atualizar={atualizar}
      />



      <ScannerStatus />



      <ScannerMonitor />



    </div>

  );

}


export default Scanner;