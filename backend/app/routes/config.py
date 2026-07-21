from fastapi import APIRouter
from app.database import SessionLocal
from app.crud import obter_configuracao, atualizar_configuracao
from app.schemas import ConfiguracaoBase, ConfiguracaoResponse

router = APIRouter(tags=["Config"])


@router.get(
    "/config",
    response_model=ConfiguracaoResponse
)
def get_config():

    db = SessionLocal()

    try:
        return obter_configuracao(db)

    finally:
        db.close()


@router.put(
    "/config",
    response_model=ConfiguracaoResponse
)
def put_config(config: ConfiguracaoBase):

    db = SessionLocal()

    try:
        return atualizar_configuracao(db, config)

    finally:
        db.close()