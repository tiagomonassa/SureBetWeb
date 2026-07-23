// ==========================================
// REGISTER PAGE
// SureBetWeb Premium
// ==========================================

import { useState } from "react";

import "./LoginPage.css";

import { register } from "../services/auth";


function RegisterPage({ voltar }) {

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [senha, setSenha] = useState("");

    const [codigo, setCodigo] = useState("");

    const [erro, setErro] = useState("");

    const [sucesso, setSucesso] = useState("");

    const [carregando, setCarregando] = useState(false);



    async function handleRegister(e) {

        e.preventDefault();

        setErro("");

        setSucesso("");

        setCarregando(true);

        try {

            await register(

                username,

                email,

                senha,

                codigo

            );

            setSucesso(

                "Conta criada com sucesso!"

            );

            setTimeout(() => {

                voltar();

            }, 1500);

        } catch (error) {

            setErro(error.message);

        } finally {

            setCarregando(false);

        }

    }



    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">

                    🎯

                </div>

                <h1>

                    Criar Conta

                </h1>

                <p>

                    Cadastro mediante convite

                </p>


                <form onSubmit={handleRegister}>

                    <input

                        type="text"

                        placeholder="Usuário"

                        value={username}

                        onChange={e => setUsername(e.target.value)}

                        required

                    />

                    <input

                        type="email"

                        placeholder="E-mail"

                        value={email}

                        onChange={e => setEmail(e.target.value)}

                        required

                    />

                    <input

                        type="password"

                        placeholder="Senha"

                        value={senha}

                        onChange={e => setSenha(e.target.value)}

                        required

                    />

                    <input

                        type="text"

                        placeholder="Código de convite"

                        value={codigo}

                        onChange={e => setCodigo(e.target.value)}

                        required

                    />

                    {

                        erro &&

                        <div className="login-error">

                            {erro}

                        </div>

                    }

                    {

                        sucesso &&

                        <div
                            className="login-success"
                            style={{
                                color: "#28c76f",
                                marginBottom: 15,
                                textAlign: "center"
                            }}
                        >

                            {sucesso}

                        </div>

                    }

                    <button

                        type="submit"

                        disabled={carregando}

                    >

                        {

                            carregando

                                ?

                                "Criando..."

                                :

                                "Criar Conta"

                        }

                    </button>

                </form>


                <button

                    type="button"

                    className="btn-criar-conta"

                    style={{

                        marginTop: 15

                    }}

                    onClick={voltar}

                >

                    Voltar ao Login

                </button>

            </div>

        </div>

    );

}

export default RegisterPage;