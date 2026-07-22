from app.database import SessionLocal, Base, engine

from app.models.usuario import Usuario

from app.services.auth import criar_hash_senha



# garante tabela criada

Base.metadata.create_all(bind=engine)



db = SessionLocal()



usuario_existente = db.query(Usuario).filter(

    Usuario.username == "admin"

).first()



if usuario_existente:

    print("Usuário admin já existe")

    db.close()

    exit()



usuario = Usuario(

    username="admin",

    email="admin@surebetweb.com",

    senha_hash=criar_hash_senha("123456"),

    ativo=True,

    admin=True

)



db.add(usuario)

db.commit()

db.refresh(usuario)



print("================================")

print("ADMIN CRIADO COM SUCESSO")

print("Usuário: admin")

print("Senha: 123456")

print("ID:", usuario.id)

print("================================")



db.close()