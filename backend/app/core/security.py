# ==========================================
# SEGURANÇA JWT
# SureBetWeb
# ==========================================


from datetime import datetime, timedelta


from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer


from jose import JWTError, jwt


from sqlalchemy.orm import Session


from app.database import SessionLocal


from app.models.usuario import Usuario





# ==========================================
# CONFIG JWT
# ==========================================


SECRET_KEY = "SUREBETWEB_SECRET_2026"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60





# ==========================================
# TOKEN BEARER
# ==========================================


oauth2_scheme = OAuth2PasswordBearer(

    tokenUrl="/auth/login"

)







# ==========================================
# BANCO
# ==========================================


def get_db():


    db = SessionLocal()


    try:

        yield db


    finally:

        db.close()







# ==========================================
# USUARIO ATUAL
# ==========================================


def get_usuario_atual(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

):


    try:


        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )


        username = payload.get("sub")



        if username is None:

            raise HTTPException(

                status_code=status.HTTP_401_UNAUTHORIZED,

                detail="Token inválido"

            )



    except JWTError:


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Token inválido"

        )





    usuario = (

        db.query(Usuario)

        .filter(

            Usuario.username == username

        )

        .first()

    )




    if usuario is None:


        raise HTTPException(

            status_code=401,

            detail="Usuário não encontrado"

        )




    if not usuario.ativo:


        raise HTTPException(

            status_code=403,

            detail="Usuário bloqueado"

        )



    return usuario