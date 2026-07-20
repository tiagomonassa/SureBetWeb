# ==========================================================
# CONFIGURAÇÃO DE MERCADOS
# SureBetWeb Market Engine
#
# Controla quais mercados serão buscados na API
# e quais estão habilitados no scanner.
# ==========================================================


MERCADOS_SUPORTADOS = [

    {
        "key": "h2h",
        "nome": "1X2",
        "descricao": "Casa, Empate, Fora",
        "ativo": True
    },


    {
        "key": "totals",
        "nome": "Gols Totais",
        "descricao": "Over / Under",
        "ativo": True
    },


    {
        "key": "spreads",
        "nome": "Handicap",
        "descricao": "Handicap Asiático",
        "ativo": True
    },


    {
        "key": "btts",
        "nome": "Ambas Marcam",
        "descricao": "Sim / Não",
        "ativo": False
    },


    {
        "key": "corners",
        "nome": "Escanteios",
        "descricao": "Over / Under Escanteios",
        "ativo": False
    }

]



def obter_mercados_ativos():

    return [

        mercado["key"]

        for mercado in MERCADOS_SUPORTADOS

        if mercado["ativo"]

    ]



def listar_mercados():

    return MERCADOS_SUPORTADOS