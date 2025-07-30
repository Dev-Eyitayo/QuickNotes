from flask import Blueprint, request
from app import db
from app.models.user import User
from app.utils import response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")  

    if User.query.filter_by(email=email).first():
        return response(False, "Email already exists", status=409)

    new_user = User(email=email, role=role)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return response(True, "New Account created successfully", new_user.to_dict(), 201)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return response(False, "Invalid credentials", status=401)

    access_token = create_access_token(identity={"id": user.id, "role": user.role})
    return response(True, "Login successful", {"token": access_token, "user": user.to_dict()})
