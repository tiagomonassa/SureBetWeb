from fastapi import APIRouter, HTTPException

from app.api import odds_api

router = APIRouter(
    prefix="/sports",
    tags=["Sports"]
)


@router.get("/")
def list_sports():
    """
    Lista todos os esportes disponíveis na The Odds API.
    """

    try:

        sports = odds_api.get_sports()

        return {
            "success": True,
            "total": len(sports),
            "sports": sports
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Erro ao consultar The Odds API: {str(e)}"
        )