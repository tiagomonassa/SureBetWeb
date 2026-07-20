const API_URL = "http://127.0.0.1:8000";





async function request(endpoint, options = {}) {


    try {


        const response = await fetch(

            `${API_URL}${endpoint}`,

            {

                headers: {

                    "Content-Type": "application/json",

                },

                ...options,

            }

        );





        if (!response.ok) {


            throw new Error(

                `Erro ${response.status}`

            );


        }






        return await response.json();





    } catch (error) {


        console.error(

            "Erro na API:",

            error

        );


        throw error;


    }


}









// ==============================
// STATUS API
// ==============================


export async function getStatus() {


    return request("/");


}









// ==============================
// OPORTUNIDADES
// ==============================


export async function getOportunidades() {


    return request(

        "/oportunidades"

    );


}







export async function criarOportunidade(dados) {


    return request(

        "/oportunidades",

        {


            method:"POST",


            body:JSON.stringify(dados),


        }


    );


}









// ==============================
// HISTÓRICO
// ==============================


export async function getHistorico() {


    return request(

        "/historico"

    );


}









// ==============================
// ODDS REAIS
// ==============================


export async function getOdds() {


    return request(

        "/odds"

    );


}









// ==============================
// SCANNER MANUAL
// ==============================


export async function executarScanner() {


    return request(

        "/scanner/analisar"

    );


}









// ==============================
// LOGS SCANNER
// ==============================


export async function getScannerLogs() {


    return request(

        "/scanner/logs"

    );


}









// ==============================
// DASHBOARD SCANNER
// ==============================


export async function getScannerDashboard() {


    return request(

        "/scanner/dashboard"

    );


}









// ==============================
// ANÁLISE
// ==============================


export async function getAnalise() {


    return request(

        "/analisar"

    );


}