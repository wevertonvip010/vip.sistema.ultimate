import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # SQLAlchemy Configuration (for SQLite)
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "vip-mudancas-secret-key-2024"
    JWT_ACCESS_TOKEN_EXPIRES = False  # Token não expira
    
    # API Keys
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
    AUTHENTIC_API_KEY = os.environ.get("AUTHENTIC_API_KEY")
    
    # CORS Configuration
    CORS_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"]
    
    # App Configuration
    SECRET_KEY = os.environ.get("SECRET_KEY") or "vip-mudancas-flask-secret"
    DEBUG = os.environ.get("FLASK_DEBUG", "True").lower() == "true"

