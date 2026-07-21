from sqlalchemy import Column, Integer, Float, String

from app.database import Base


class Configuracao(Base):
    __tablename__ = "configuracao"

    id = Column(Integer, primary_key=True, index=True)

    valor_total = Column(Float, default=1000)

    lucro_minimo = Column(Float, default=0)

    sport_key = Column(String, default="soccer_epl")

    mercados = Column(String, default="h2h,totals,spreads")

    intervalo_scan = Column(Integer, default=15)