// ==========================================
// APP
// SureBetWeb Premium
// Controle de acesso
// ==========================================


import {
    useState
} from "react";


import LoginPage from "./pages/LoginPage";


import DashboardPage from "./pages/DashboardPage";


import Header from "./components/Header/Header";



import {
    getToken,
    logout
} from "./services/auth";



import "./App.css";






function App(){



    const [

        autenticado,

        setAutenticado

    ] = useState(

        !!getToken()

    );







    function entrar(){


        setAutenticado(true);


    }









    function sair(){


        logout();


        setAutenticado(false);


    }









    // ============================
    // LOGIN
    // ============================


    if(!autenticado){


        return (

            <LoginPage

                onLogin={entrar}

            />

        );


    }









    // ============================
    // SISTEMA LOGADO
    // ============================


    return (


        <div className="app">







            <Header

                onLogout={sair}

            />










            <div className="content">



                <main className="main">



                    <DashboardPage />



                </main>



            </div>






        </div>


    );


}





export default App;