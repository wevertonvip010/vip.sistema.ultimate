from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from src.models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Endpoint de login"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({"error": "Email e senha são obrigatórios"}), 400
        
        # Autenticar usuário
        user = User.find_by_email(email)
        if not user or not user.check_password(password):
            return jsonify({"error": "Credenciais inválidas"}), 401
        
        # Criar token JWT
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            "message": "Login realizado com sucesso",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "role": user.role
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    """Endpoint de registro (apenas para desenvolvimento)"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        if not email or not password or not name:
            return jsonify({"error": "Email, senha e nome são obrigatórios"}), 400
        
        # Criar usuário
        user = User.find_by_email(email)
        if user:
            return jsonify({"error": "Usuário já existe"}), 409

        new_user = User.create_user(email, password, name)
        
        return jsonify({
            "message": "Usuário criado com sucesso",
            "user_id": new_user.id
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Obter dados do usuário atual"""
    try:
        user_id = get_jwt_identity()
        user = User.find_by_id(user_id)
        
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        return jsonify({
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "role": user.role
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


