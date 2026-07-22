// =====================================
// SUREBETWEB API SERVICE
// Frontend -> FastAPI
// =====================================

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://surebets-ve2i.onrender.com";

console.log("API_URL USADA:", API_URL);

export default API_URL;

// =====================================
// FUNÇÃO BASE
// =====================================

async function request(endpoint, options = {}) {

    try {


        const token = localStorage.getItem(
            "token"
        );


        const headers = {


            "Content-Type": "application/json"

        };



        if (token) {


            headers.Authorization =

                `Bearer ${token}`;


        }



        const response = await fetch(

            `${API_URL}${endpoint}`,

            {

                headers,

                ...options
            }
        );

        if (!response.ok) {

            throw new Error(
                `Erro HTTP ${response.status}`
            );

        }

        return await response.json();

    } catch (error) {

        console.error("Erro API:", error);

        throw error;

    }

}

// =====================================
// STATUS API
// =====================================

export function statusAPI() {

    return request("/status");

}

// =====================================
// ESPORTES
// =====================================

export function buscarEsportes() {

    return request("/sports/");

}

// =====================================
// OPORTUNIDADES
// =====================================

export function buscarOportunidades() {

    return request("/oportunidades");

}

// =====================================
// DASHBOARD
// =====================================

export function buscarDashboard() {

    return request("/dashboard");

}

// =====================================
// SCANNER
// =====================================

export function executarScanner() {

    return request("/scanner/");

}

export function executarScannerManual() {

    return request(
        "/scanner/executar",
        {
            method: "POST"
        }
    );

}

export function statusScanner() {

    return request("/scanner/status");

}

// =====================================
// SCHEDULER
// =====================================

export function statusScheduler() {

    return request("/scheduler/status");

}

export function executarScheduler() {

    return request("/scheduler/executar");

}

export async function buscarConfiguracao() {
    const resposta = await fetch(
        `${API_URL}/config`
    );

    return resposta.json();
}



export async function salvarConfiguracao(config) {
    const resposta = await fetch(
        `${API_URL}/config`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(config)
        }
    );

    return resposta.json();
}