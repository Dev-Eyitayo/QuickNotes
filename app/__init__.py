from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    SECRET_KEY = os.getenv("SECRET_KEY", "super-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key")
    
    
    db.init_app(app)
    jwt.init_app(app)

    from app.routes.note_routes import note_bp
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(note_bp, url_prefix="/api/notes")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app
