from src.database import db
from datetime import datetime

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefone = db.Column(db.String(20), nullable=True)
    status = db.Column(db.String(50), default="Novo")
    fonte = db.Column(db.String(100), nullable=True)
    justificativa = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Cliente {self.nome}>'

    @staticmethod
    def create(data):
        cliente = Cliente(
            nome=data.get('nome'),
            email=data.get('email'),
            telefone=data.get('telefone'),
            status=data.get('status', 'Novo'),
            fonte=data.get('fonte'),
            justificativa=data.get('justificativa')
        )
        db.session.add(cliente)
        db.session.commit()
        return cliente.id

    @staticmethod
    def get_all():
        return [c.to_dict() for c in Cliente.query.all()]

    @staticmethod
    def get_by_id(cliente_id):
        return Cliente.query.get(cliente_id).to_dict() if Cliente.query.get(cliente_id) else None

    @staticmethod
    def update(cliente_id, data):
        cliente = Cliente.query.get(cliente_id)
        if not cliente:
            return False
        for key, value in data.items():
            setattr(cliente, key, value)
        db.session.commit()
        return True

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'telefone': self.telefone,
            'status': self.status,
            'fonte': self.fonte,
            'justificativa': self.justificativa,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


