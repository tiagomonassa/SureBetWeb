// ==========================================
// LOGIN PAGE
// SureBetWeb Premium
// ==========================================

import { useState } from "react";

import "./LoginPage.css";

import { login } from "../services/auth";


function LoginPage({ onLogin }) {


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [erro, setErro] = useState("");

    const [carregando, setCarregando] = useState(false);




    async function handleLogin(e) {

        e.preventDefault();


        setErro("");

        setCarregando(true);


        try {


            const resposta = await login(
                username,
                password
            );


            localStorage.setItem(
                "token",
                resposta.access_token
            );


            localStorage.setItem(
                "usuario",
                JSON.stringify(resposta.usuario)
            );


            if(onLogin){

                onLogin(resposta);

            }



        } catch(error) {


            setErro(
                "Usuário ou senha inválidos"
            );


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

                    SureBetWeb

                </h1>



                <p>

                    Acesso privado ao sistema

                </p>





                <form onSubmit={handleLogin}>


                    <input

                        type="text"

                        placeholder="Usuário"

                        value={username}

                        onChange={
                            e => setUsername(e.target.value)
                        }

                    />




                    <input

                        type="password"

                        placeholder="Senha"

                        value={password}

                        onChange={
                            e => setPassword(e.target.value)
                        }

                    />




                    {
                        erro &&

                        <div className="login-error">

                            {erro}

                        </div>

                    }




                    <button

                        type="submit"

                        disabled={carregando}

                    >


                        {
                            carregando

                            ?

                            "Entrando..."

                            :

                            "Entrar"

                        }


                    </button>



                </form>



            </div>



        </div>


    );

}



export default LoginPage;