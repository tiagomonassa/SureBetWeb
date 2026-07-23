# ==========================================
# BOOTSTRAP DO SISTEMA
# SureBetWeb
# ==========================================

from app.database import SessionLocal

from app.models.usuario import Usuario

from app.services.auth import criar_hash_senha


def criar_admin_padrao():

    db = SessionLocal()

    try:

        usuario = (

            db.query(Usuario)

            .filter(

                Usuario.username == "admin"

            )

            .first()

        )

        if usuario:

            print("Administrador já existe.")

            return

        admin = Usuario(

            username="admin",

            email="admin@surebetweb.com",

            senha_hash=criar_hash_senha("admin123"),

            ativo=True,

            admin=True

        )

        db.add(admin)

        db.commit()

        print("Administrador padrão criado.")

    finally:

        db.close()