// ==========================================
// APP
// SureBetWeb Premium
// Controle de acesso + Rotas
// ==========================================


import {
    useState
} from "react";


import {
    Routes,
    Route
} from "react-router-dom";



import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";

import CalculadoraPage from "./pages/CalculadoraPage";

import MercadosPage from "./pages/MercadosPage";

import ConfigPage from "./pages/ConfigPage";



import Header from "./components/Header/Header";

import Sidebar from "./components/Sidebar/Sidebar";



import {
    getToken,
    logout
} from "./services/auth";



import "./App.css";





function App() {


    const [

        autenticado,

        setAutenticado

    ] = useState(

        !!getToken()

    );



    const [

        tela,

        setTela

    ] = useState("login");







    function entrar(){


        setAutenticado(true);


    }






    function sair(){


        logout();


        setAutenticado(false);


        setTela("login");


    }







    // ============================
    // LOGIN / CADASTRO
    // ============================


    if(!autenticado){



        if(tela === "register"){


            return (


                <RegisterPage

                    voltar={

                        () => setTela("login")

                    }

                />


            );


        }





        return (


            <LoginPage

                onLogin={entrar}


                criarConta={

                    () => setTela("register")

                }


            />


        );


    }









    // ============================
    // SISTEMA
    // ============================


    return (



        <div className="app">



            <Header

                onLogout={sair}

            />





            <div className="content">





                <Sidebar />







                <main className="main">





                    <Routes>



                        <Route

                            path="/"

                            element={

                                <DashboardPage />

                            }

                        />





                        <Route

                            path="/calculadora"

                            element={

                                <CalculadoraPage />

                            }

                        />





                        <Route

                            path="/mercados"

                            element={

                                <MercadosPage />

                            }

                        />





                        <Route

                            path="/config"

                            element={

                                <ConfigPage />

                            }

                        />





                    </Routes>





                </main>





            </div>





        </div>


    );


}



export default App;