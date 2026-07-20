from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime
)

from datetime import datetime

from app.database import Base


class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String(50),
        unique=True,
        nullable=False
    )

    email = Column(
        String(120),
        unique=True,
        nullable=False
    )

    senha_hash = Column(
        String(255),
        nullable=False
    )

    ativo = Column(
        Boolean,
        default=True
    )

    admin = Column(
        Boolean,
        default=False
    )

    data_criacao = Column(
        DateTime,
        default=datetime.utcnow
    )