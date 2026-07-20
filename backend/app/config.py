from pathlib import Path
from dotenv import load_dotenv
import os

# Caminho da pasta backend
BASE_DIR = Path(__file__).resolve().parent.parent

# Carrega o arquivo .env
load_dotenv(BASE_DIR / ".env")


class Settings:
    APP_NAME = "SureBetWeb API"
    VERSION = "1.0.0"

    ODDS_API_KEY = os.getenv("ODDS_API_KEY", "")

    ODDS_REGION = os.getenv("ODDS_REGION", "eu")

    ODDS_MARKETS = os.getenv("ODDS_MARKETS", "h2h")

    SCAN_INTERVAL = int(os.getenv("SCAN_INTERVAL", 30))


settings = Settings()