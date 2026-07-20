import { useState } from "react";

import { executarScanner } from "../../services/api";

import "./ScannerButton.css";


function ScannerButton({ atualizar }) {


  const [status, setStatus] = useState("");



  async function executar() {


    try {


      setStatus("Executando scanner...");


      const resultado = await executarScanner();



      setStatus(
        `${resultado.quantidade_encontrada} oportunidade(s) encontrada(s) | ${resultado.quantidade_salva} nova(s) salva(s)`
      );



      if (atualizar) {

        atualizar();

      }



    } catch (error) {


      console.error(error);


      setStatus(
        "Erro ao executar scanner"
      );


    }


  }




  return (

    <div className="scanner-box">


      <button

        className="scanner-button"

        onClick={executar}

      >

        🔎 Scanner SureHunter

      </button>



      {
        status &&

        <span className="scanner-message">

          {status}

        </span>

      }


    </div>

  );


}


export default ScannerButton;