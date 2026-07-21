from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel


class ApostaResponse(BaseModel):

    id: int
    casa: str
    selecao: str
    odd: float
    valor_aposta: float
    retorno: float

    class Config:
        from_attributes = True



class OportunidadeResponse(BaseModel):

    id: int
    evento: str
    mercado: str

    linha: Optional[float] = None

    lucro_percentual: float

    investimento: float

    retorno_final: float

    lucro: float

    data_criacao: datetime

    data_evento: datetime | None

    apostas: List[ApostaResponse] = []

    class Config:
        from_attributes = True



class ConfiguracaoBase(BaseModel):

    valor_total: float

    lucro_minimo: float

    sport_key: str

    mercados: str

    intervalo_scan: int



class ConfiguracaoResponse(ConfiguracaoBase):

    id: int

    class Config:
        from_attributes = True