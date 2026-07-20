import "./Configuracoes.css";


function Configuracoes() {

  return (

    <div className="configuracoes">


      <h1 className="titulo-pagina">
        ⚙️ Configurações
      </h1>




      <div className="config-grid">



        <div className="config-card status">


          <h3>
            🟢 Status do Sistema
          </h3>


          <p>
            API:
            <strong>
              Online
            </strong>
          </p>


          <p>
            Banco de dados:
            <strong>
              Conectado
            </strong>
          </p>


          <p>
            Motor de análise:
            <strong>
              Ativo
            </strong>
          </p>


        </div>





        <div className="config-card">


          <h3>
            💻 Informações
          </h3>


          <p>
            Sistema:
            <strong>
              SureHunter
            </strong>
          </p>


          <p>
            Versão:
            <strong>
              1.0
            </strong>
          </p>


          <p>
            Frontend:
            <strong>
              React
            </strong>
          </p>


          <p>
            Backend:
            <strong>
              FastAPI
            </strong>
          </p>


          <p>
            Banco:
            <strong>
              MySQL
            </strong>
          </p>


        </div>





        <div className="config-card">


          <h3>
            ⚙️ Recursos
          </h3>


          <ul>

            <li>
              Integração com casas de apostas
            </li>


            <li>
              Alertas automáticos
            </li>


            <li>
              Preferências de análise
            </li>


            <li>
              Gerenciamento de usuários
            </li>


          </ul>


        </div>




      </div>


    </div>

  );

}


export default Configuracoes;