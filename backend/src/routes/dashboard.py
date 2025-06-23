from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from src.models.cliente import Cliente
from src.models.orcamento import Orcamento
from src.models.financeiro import Financeiro
from src.models.guardamoveis import GuardaMoveis
from src.models.estoque import Estoque
from src.models.lead import Lead
from src.database import db
from datetime import datetime, timedelta

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/metricas", methods=["GET"])
@jwt_required()
def get_metricas():
    """Obter métricas principais do dashboard"""
    try:
        # Buscar dados dos últimos 30 dias
        data_limite = datetime.utcnow() - timedelta(days=30)
        
        # Contar mudanças agendadas (simulado)
        mudancas_agendadas = 24
        
        # Contar visitas pendentes
        visitas_pendentes = Cliente.query.filter(Cliente.status == "Visita Agendada").count()
        
        # Contar boxes ocupados
        boxes_ocupados = GuardaMoveis.query.filter(GuardaMoveis.status == "Ocupado").count()
        
        # Calcular faturamento mensal
        faturamento_mensal = db.session.query(db.func.sum(Financeiro.valor)).filter(Financeiro.tipo == "receita", Financeiro.data >= data_limite).scalar() or 0
        
        return jsonify({
            "metricas": {
                "mudancas_agendadas": mudancas_agendadas,
                "visitas_pendentes": visitas_pendentes,
                "boxes_ocupados": boxes_ocupados,
                "faturamento_mensal": faturamento_mensal
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/atividades-recentes", methods=["GET"])
@jwt_required()
def get_atividades_recentes():
    """Obter atividades recentes"""
    try:
        # Simular atividades recentes
        atividades = [
            {
                "id": "1",
                "tipo": "mudanca",
                "titulo": "Mudança agendada",
                "descricao": "Cliente: Carlos Silva",
                "data": datetime.utcnow() - timedelta(hours=2),
                "status": "agendada",
                "icone": "truck"
            },
            {
                "id": "2",
                "tipo": "pagamento",
                "titulo": "Pagamento recebido",
                "descricao": "R$ 2.500,00 - Contrato #1082",
                "data": datetime.utcnow() - timedelta(hours=5),
                "status": "recebido",
                "icone": "dollar-sign"
            },
            {
                "id": "3",
                "tipo": "contrato",
                "titulo": "Novo contrato Self Storage",
                "descricao": "Box #15 - Cliente: Ana Paula",
                "data": datetime.utcnow() - timedelta(hours=8),
                "status": "novo",
                "icone": "file-text"
            }
        ]
        
        # Converter datetime para string
        for atividade in atividades:
            atividade["data"] = atividade["data"].isoformat()
        
        return jsonify({"atividades": atividades}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/calendario", methods=["GET"])
@jwt_required()
def get_calendario():
    """Obter eventos do calendário"""
    try:
        # Simular eventos do calendário
        eventos = [
            {
                "id": "1",
                "titulo": "Visita - Carlos Silva",
                "data": "2025-06-19",
                "tipo": "visita",
                "cor": "red"
            },
            {
                "id": "2",
                "titulo": "Pagamento Contrato #1082",
                "data": "2025-06-19",
                "tipo": "pagamento",
                "cor": "green"
            },
            {
                "id": "3",
                "titulo": "Mudança Família Oliveira",
                "data": "2025-06-20",
                "tipo": "mudanca",
                "cor": "blue"
            },
            {
                "id": "4",
                "titulo": "Contrato Storage Ana Paula",
                "data": "2025-06-21",
                "tipo": "contrato",
                "cor": "orange"
            },
            {
                "id": "5",
                "titulo": "Mudança Escritório",
                "data": "2025-06-25",
                "tipo": "mudanca",
                "cor": "blue"
            }
        ]
        
        return jsonify({"eventos": eventos}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/notificacoes", methods=["GET"])
@jwt_required()
def get_notificacoes():
    """Obter notificações do sistema"""
    try:
        # Simular notificações
        notificacoes = [
            {
                "id": "1",
                "titulo": "Nova licitação encontrada",
                "mensagem": "Licitação para mudança de órgão público - Valor: R$ 150.000",
                "tipo": "licitacao",
                "lida": False,
                "data": datetime.utcnow() - timedelta(minutes=30)
            },
            {
                "id": "2",
                "titulo": "Estoque baixo",
                "mensagem": "Caixas de papelão: apenas 15 unidades restantes",
                "tipo": "estoque",
                "lida": False,
                "data": datetime.utcnow() - timedelta(hours=2)
            },
            {
                "id": "3",
                "titulo": "Novo lead capturado",
                "mensagem": "João Silva - Gerente de Facilities na Tech Corp",
                "tipo": "lead",
                "lida": True,
                "data": datetime.utcnow() - timedelta(hours=4)
            }
        ]
        
        # Converter datetime para string
        for notificacao in notificacoes:
            notificacao["data"] = notificacao["data"].isoformat()
        
        return jsonify({"notificacoes": notificacoes}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/resumo-modulos", methods=["GET"])
@jwt_required()
def get_resumo_modulos():
    """Obter resumo dos módulos com badges de notificação"""
    try:
        resumo = {
            "clientes": Cliente.query.filter_by(status="Novo").count(),
            "visitas": Cliente.query.filter_by(status="Visita Agendada").count(),
            "orcamentos": Orcamento.query.filter_by(status="Pendente").count(),
            "contratos": 0, # Simulado, adicionar modelo de Contrato
            "ordens_servico": 0, # Simulado, adicionar modelo de OrdemServico
            "self_storage": GuardaMoveis.query.filter_by(status="Ocupado").count(),
            "financeiro": Financeiro.query.filter_by(tipo="despesa").count(), # Exemplo: despesas pendentes
            "marketing": 0, # Simulado
            "vendas": 0, # Simulado
            "estoque": Estoque.query.filter(Estoque.quantidade < 20).count(), # Exemplo: itens com estoque baixo
            "programa_pontos": 0, # Simulado
            "calendario": 0, # Simulado
            "graficos": 0, # Simulado
            "configuracoes": 0, # Simulado
            "leads_linkedin": Lead.query.filter_by(status="Novo").count()
        }
        
        return jsonify({"resumo_modulos": resumo}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

