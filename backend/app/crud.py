# Bibliotecas externas
from sqlalchemy.orm import Session, joinedload
from datetime import datetime, timedelta


# Modelos do projeto
from app.models.oportunidade import Oportunidade
from app.models.aposta import Aposta
from app.models.configuracao import Configuracao


def criar_ou_atualizar_oportunidade(
    db: Session,
    oportunidade: dict
):

    data_evento = oportunidade.get("data_evento")

    if data_evento:

        data_evento = datetime.fromisoformat(
            data_evento.replace("Z", "+00:00")
        )


    existente = (
        db.query(Oportunidade)
        .filter(
            Oportunidade.evento == oportunidade["evento"],
            Oportunidade.mercado == oportunidade["mercado"],
            Oportunidade.linha == oportunidade.get("linha")
        )
        .first()
    )

    if existente:

        existente.lucro_percentual = oportunidade["lucro_percentual"]

        existente.investimento = oportunidade["investimento"]

        existente.retorno_final = oportunidade["retorno_final"]

        existente.lucro = oportunidade["lucro"]

        existente.data_evento = data_evento

        db.commit()
        db.refresh(existente)

        return existente

    nova = Oportunidade(

        evento=oportunidade["evento"],
        mercado=oportunidade["mercado"],
        linha=oportunidade.get("linha"),

        lucro_percentual=oportunidade["lucro_percentual"],
        investimento=oportunidade["investimento"],
        retorno_final=oportunidade["retorno_final"],
        lucro=oportunidade["lucro"],
        data_evento=data_evento 

    )

    db.add(nova)
    db.commit()
    db.refresh(nova)

    return nova


def substituir_apostas(
    db: Session,
    oportunidade_id: int,
    apostas: list
):

    (
        db.query(Aposta)
        .filter(Aposta.oportunidade_id == oportunidade_id)
        .delete(synchronize_session=False)
    )

    db.commit()

    for aposta in apostas:

        nova = Aposta(

            oportunidade_id=oportunidade_id,

            casa=aposta["casa"],

            selecao=aposta["selecao"],

            odd=aposta["odd"],

            valor_aposta=aposta["valor_aposta"],

            retorno=aposta["retorno"]

        )

        db.add(nova)

    db.commit()


def listar_oportunidades(
    db: Session
):

    limite = datetime.now() - timedelta(hours=24)

    return (

        db.query(Oportunidade)

        .options(
            joinedload(Oportunidade.apostas)
        )

        .filter(
            Oportunidade.data_evento >= datetime.now()

        )
        
        .order_by(
            Oportunidade.id.desc()
        )

        .all()

    )

   


def obter_configuracao(db):
    config = db.query(Configuracao).first()

    if not config:
        config = Configuracao(
            valor_total=1000,
            lucro_minimo=0,
            sport_key="soccer_epl",
            mercados="h2h,totals,spreads",
            intervalo_scan=15,
        )
        db.add(config)
        db.commit()
        db.refresh(config)

    return config


def atualizar_configuracao(db, dados):
    config = obter_configuracao(db)

    config.valor_total = dados.valor_total
    config.lucro_minimo = dados.lucro_minimo
    config.sport_key = dados.sport_key
    config.mercados = dados.mercados
    config.intervalo_scan = dados.intervalo_scan

    db.commit()
    db.refresh(config)

    return config