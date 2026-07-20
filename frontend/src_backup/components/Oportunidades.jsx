import OportunidadeCard from "./OportunidadeCard";

import "./Oportunidades.css";


function Oportunidades({ oportunidades = [], analisar }) {


  return (

    <div className="oportunidades">


      <div className="titulo-oportunidades">


        <h2>
          🔥 Oportunidades ao vivo
        </h2>


      </div>





      <div className="lista-oportunidades">


        {

          oportunidades.length > 0 ?


          oportunidades.map((op,index)=>(

            <OportunidadeCard

              key={index}

              op={op}

              index={index}

              analisar={analisar}

            />

          ))


          :


          <div className="sem-oportunidades">

            <h3>
              Nenhuma oportunidade encontrada
            </h3>


            <p>
              Quando novas oportunidades forem detectadas,
              aparecerão aqui.
            </p>


          </div>


        }


      </div>


    </div>

  );

}


export default Oportunidades;