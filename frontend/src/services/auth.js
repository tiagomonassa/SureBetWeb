// ==========================================
// AUTH SERVICE
// SureBetWeb
// ==========================================


const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://surebets-ve2i.onrender.com";




// ==========================================
// LOGIN
// ==========================================


export async function login(
    username,
    password
) {


    const formData = new URLSearchParams();


    formData.append(
        "username",
        username
    );


    formData.append(
        "password",
        password
    );



    const response = await fetch(

        `${API_URL}/auth/login`,

        {

            method:"POST",


            headers:{

                "Content-Type":
                "application/x-www-form-urlencoded"

            },


            body:formData

        }

    );



    if(!response.ok){


        throw new Error(
            "Falha no login"
        );


    }



    return await response.json();


}





// ==========================================
// TOKEN
// ==========================================


export function getToken(){


    return localStorage.getItem(
        "token"
    );


}





// ==========================================
// USUÁRIO LOGADO
// ==========================================


export function getUsuario(){


    const usuario = localStorage.getItem(
        "usuario"
    );


    if(!usuario){

        return null;

    }


    return JSON.parse(
        usuario
    );


}





// ==========================================
// LOGOUT
// ==========================================


export function logout(){


    localStorage.removeItem(
        "token"
    );


    localStorage.removeItem(
        "usuario"
    );


}