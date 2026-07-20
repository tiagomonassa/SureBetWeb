import "./Filters.css";


function Filters() {


  return (

    <section className="filters-container">


      <div className="filter-group">

        <label>
          Esporte
        </label>

        <select>

          <option>
            Todos
          </option>

          <option>
            Futebol
          </option>

          <option>
            Basquete
          </option>

          <option>
            Tênis
          </option>

        </select>

      </div>



      <div className="filter-group">

        <label>
          Mercado
        </label>


        <select>

          <option>
            Todos
          </option>


          <option>
            1X2
          </option>


          <option>
            Under / Over
          </option>


          <option>
            Corners
          </option>


          <option>
            BTTS
          </option>


          <option>
            Handicap
          </option>


        </select>


      </div>




      <div className="filter-group">

        <label>
          Lucro mínimo
        </label>


        <select>


          <option>
            0%
          </option>


          <option>
            1%
          </option>


          <option>
            3%
          </option>


          <option>
            5%
          </option>


          <option>
            10%
          </option>


        </select>


      </div>




      <div className="filter-group search">


        <label>
          Buscar evento
        </label>


        <input

          type="text"

          placeholder="Digite o evento..."

        />


      </div>




      <button className="filter-btn">

        🔍 Filtrar

      </button>



    </section>

  );

}


export default Filters;