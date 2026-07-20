from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Aposta(Base):

    __tablename__ = "apostas"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    oportunidade_id = Column(
        Integer,
        ForeignKey("oportunidades.id"),
        nullable=False
    )


    casa = Column(
        String,
        nullable=False
    )


    selecao = Column(
        String,
        nullable=False
    )


    odd = Column(
        Float,
        nullable=False
    )


    valor_aposta = Column(
        Float,
        nullable=False
    )


    retorno = Column(
        Float,
        nullable=False
    )


    oportunidade = relationship(
        "Oportunidade",
        back_populates="apostas"
    )