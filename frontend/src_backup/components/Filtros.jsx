import "./Filtros.css";

function Filtros({ busca, setBusca, lucroMinimo, setLucroMinimo }) {


  return (

    <div className="filtros">


      <div className="campo-busca">


        <label>
          🔎 Buscar oportunidade
        </label>


        <input

          type="text"

          placeholder="Digite o evento..."

          value={busca}

          onChange={(e) =>
            setBusca(e.target.value)
          }

        />


      </div>





      <div className="campo-filtro">


        <label>
          💰 Filtrar lucro
        </label>



        <select

          value={lucroMinimo}

          onChange={(e) =>
            setLucroMinimo(
              Number(e.target.value)
            )
          }

        >


          <option value={0}>
            Todos os lucros
          </option>



          <option value={5}>
            Acima de 5%
          </option>



          <option value={7}>
            Acima de 7%
          </option>



          <option value={10}>
            Acima de 10%
          </option>



        </select>


      </div>



    </div>

  );

}


export default Filtros;