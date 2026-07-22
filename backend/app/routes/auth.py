from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.usuario import Usuario

from app.services.auth import (
    verificar_senha,
    criar_token
)



router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"]
)



# =====================================
# BANCO
# =====================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()



# =====================================
# LOGIN
# =====================================


@router.post("/login")
def login(

    form_data: OAuth2PasswordRequestForm = Depends(),

    db: Session = Depends(get_db)

):


    usuario = db.query(Usuario).filter(

        Usuario.username == form_data.username

    ).first()



    if not usuario:


        raise HTTPException(

            status_code=401,

            detail="Usuário ou senha inválidos"

        )



    if not verificar_senha(

        form_data.password,

        usuario.senha_hash

    ):


        raise HTTPException(

            status_code=401,

            detail="Usuário ou senha inválidos"

        )




    token = criar_token({

        "sub": usuario.username,

        "admin": usuario.admin

    })



    return {


        "access_token": token,

        "token_type": "bearer",


        "usuario": {


            "username": usuario.username,

            "admin": usuario.admin


        }


    }