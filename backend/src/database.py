from flask_sqlalchemy import SQLAlchemy
from src.config import Config
import logging

db = SQLAlchemy()

class Database:
    def __init__(self, app=None):
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        db.init_app(app)
        with app.app_context():
            db.create_all()
            logging.info("Banco de dados SQLite inicializado e tabelas criadas.")



