import {
    useEffect,
    useState
} from "react";


import "./Header.css";
import "./HeaderMobile.css";


import {
    statusAPI
} from "../../services/api";


import {
    useSurebets
} from "../../context/SurebetContext";


import {
    getUsuario,
    logout
} from "../../services/auth";




function Header({ onLogout }) {


    const {

        atualizar,

        ultimaAtualizacao,

        novasSurebets,

        carregando

    } = useSurebets();




    const [status,setStatus] = useState(
        "offline"
    );


    const [segundos,setSegundos] = useState(0);



    const usuario = getUsuario();





    async function verificarAPI(){


        try{


            const resposta = await statusAPI();


            setStatus(

                resposta.api === "online"

                ?

                "online"

                :

                "offline"

            );


        }

        catch{


            setStatus("offline");


        }

    }






    useEffect(()=>{


        verificarAPI();


        const timer = setInterval(

            verificarAPI,

            30000

        );


        return ()=>clearInterval(timer);


    },[]);






    useEffect(()=>{


        const contador = setInterval(()=>{


            if(ultimaAtualizacao){


                const agora = new Date();


                const diff = Math.floor(

                    (
                        agora -
                        ultimaAtualizacao

                    ) / 1000

                );


                setSegundos(diff);


            }


        },1000);



        return ()=>clearInterval(contador);


    },[ultimaAtualizacao]);






    return (


        <header className="header">





            {/* ESQUERDA */}


            <div className="header-left">


                <div 
                className={`status ${status}`}>


                    <span className="dot"></span>


                    {
                        status === "online"

                        ?

                        "API Online"

                        :

                        "API Offline"
                    }


                </div>


            </div>









            {/* CENTRO */}


            <div className="brand-center">



                <div className="football-animation">


                    ⚽


                </div>



                <div className="logo">


                    🎯 SureBet

                    <span>
                        Web
                    </span>


                </div>



            </div>










            {/* DIREITA */}


            {/* INFORMAÇÕES */}

            <div className="header-right">


                <div className="header-info">

                    🕒 Atualizado há {segundos}s

                </div>



                <div className="header-info success">

                    ✨ {novasSurebets} nova(s)

                </div>



                <button

                    className="btn-refresh"

                    onClick={atualizar}

                    disabled={carregando}

                >

                    {carregando ? "Atualizando..." : "Atualizar"}

                </button>


            </div>




            {/* USUARIO */}

            <div className="header-user">


                <div className="user-name">

                    👤 {usuario?.username || "admin"}

                </div>



                <button

                    className="btn-logout"

                    onClick={onLogout}

                >

                    🚪 Sair

                </button>


            </div>






        </header>


    );

}



export default Header;