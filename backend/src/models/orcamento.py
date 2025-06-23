from src.database import db
from datetime import datetime

class Orcamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey("cliente.id"), nullable=False)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    valor_total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="Pendente")
    
    def __repr__(self):
        return f'<Orcamento {self.id}>'

    @staticmethod
    def create(data):
        orcamento = Orcamento(
            cliente_id=data.get("cliente_id"),
            valor_total=data.get("valor_total"),
            status=data.get("status", "Pendente")
        )
        db.session.add(orcamento)
        db.session.commit()
        return orcamento.id

    @staticmethod
    def get_all():
        return [o.to_dict() for o in Orcamento.query.all()]

    @staticmethod
    def get_by_id(orcamento_id):
        return Orcamento.query.get(orcamento_id).to_dict() if Orcamento.query.get(orcamento_id) else None

    @staticmethod
    def update(orcamento_id, data):
        orcamento = Orcamento.query.get(orcamento_id)
        if not orcamento:
            return False
        for key, value in data.items():
            setattr(orcamento, key, value)
        db.session.commit()
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "data_criacao": self.data_criacao.isoformat() if self.data_criacao else None,
            "valor_total": self.valor_total,
            "status": self.status
        }


