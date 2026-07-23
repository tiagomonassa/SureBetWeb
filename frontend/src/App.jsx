// ==========================================
// APP
// SureBetWeb Premium
// Controle de acesso
// ==========================================

import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

import Header from "./components/Header/Header";

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



    function entrar() {

        setAutenticado(true);

    }



    function sair() {

        logout();

        setAutenticado(false);

        setTela("login");

    }



    // ============================
    // LOGIN / CADASTRO
    // ============================

    if (!autenticado) {

        if (tela === "register") {

            return (

                <RegisterPage

                    voltar={() => setTela("login")}

                />

            );

        }

        return (

            <LoginPage

                onLogin={entrar}

                criarConta={() => setTela("register")}

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