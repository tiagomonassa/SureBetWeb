from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Oportunidade(Base):

    __tablename__ = "oportunidades"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    evento = Column(
        String,
        nullable=False
    )


    mercado = Column(
        String,
        nullable=False
    )


    linha = Column(
        Float,
        nullable=True
    )


    lucro_percentual = Column(
        Float,
        nullable=False
    )


    investimento = Column(
        Float,
        nullable=False
    )


    retorno_final = Column(
        Float,
        nullable=False
    )


    lucro = Column(
        Float,
        nullable=False
    )


    data_criacao = Column(
        DateTime,
        default=datetime.utcnow
    )

    data_evento = Column(
        DateTime,
        nullable=True
    )    

    apostas = relationship(
        "Aposta",
        back_populates="oportunidade",
        cascade="all, delete-orphan"
    )