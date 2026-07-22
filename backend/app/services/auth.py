# ==========================================
# SERVIÇO DE AUTENTICAÇÃO
# SureBetWeb
# ==========================================


from datetime import datetime, timedelta

from passlib.context import CryptContext

from jose import jwt



# ==========================================
# CONFIGURAÇÃO HASH SENHA
# ==========================================


pwd_context = CryptContext(

    schemes=["bcrypt"],

    deprecated="auto"

)



# ==========================================
# CONFIGURAÇÃO JWT
# ==========================================


SECRET_KEY = "SUREBETWEB_SECRET_2026"

ALGORITHM = "HS256"

TOKEN_EXPIRATION_MINUTES = 60 * 24





# ==========================================
# CRIAR HASH SENHA
# ==========================================


def criar_hash_senha(

    senha: str

):

    return pwd_context.hash(

        senha

    )





# ==========================================
# VERIFICAR SENHA
# ==========================================


def verificar_senha(

    senha_plana: str,

    senha_hash: str

):


    return pwd_context.verify(

        senha_plana,

        senha_hash

    )





# ==========================================
# CRIAR TOKEN JWT
# ==========================================


def criar_token(

    dados: dict

):


    dados_token = dados.copy()



    expiracao = datetime.utcnow() + timedelta(

        minutes=TOKEN_EXPIRATION_MINUTES

    )


    dados_token.update({

        "exp": expiracao

    })



    token = jwt.encode(

        dados_token,

        SECRET_KEY,

        algorithm=ALGORITHM

    )


    return token





# ==========================================
# VALIDAR TOKEN JWT
# ==========================================


def verificar_token(

    token: str

):


    try:


        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )


        return payload



    except Exception:


        return None