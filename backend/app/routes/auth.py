from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
import os

from app.database import SessionLocal
from app.models.usuario import Usuario
from app.services.auth import (
    verificar_senha,
    criar_token,
    criar_hash_senha
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
# MODELO CADASTRO
# =====================================

class CadastroUsuario(BaseModel):
    username: str
    email: str
    senha: str
    codigo_convite: str


INVITE_CODE = os.getenv("INVITE_CODE", "SUREBET2026")


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


# =====================================
# CADASTRO
# =====================================

@router.post("/register")
def register(
    dados: CadastroUsuario,
    db: Session = Depends(get_db)
):

    if dados.codigo_convite != INVITE_CODE:
        raise HTTPException(
            status_code=400,
            detail="Código de convite inválido"
        )

    if db.query(Usuario).filter(
        Usuario.username == dados.username
    ).first():
        raise HTTPException(
            status_code=400,
            detail="Usuário já existe"
        )

    if db.query(Usuario).filter(
        Usuario.email == dados.email
    ).first():
        raise HTTPException(
            status_code=400,
            detail="E-mail já cadastrado"
        )

    usuario = Usuario(
        username=dados.username,
        email=dados.email,
        senha_hash=criar_hash_senha(dados.senha),
        ativo=True,
        admin=False
    )

    db.add(usuario)
    db.commit()

    return {
        "mensagem": "Conta criada com sucesso."
    }