import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Package, 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Activity,
  Clock,
  MapPin,
  Star
} from 'lucide-react';
import mockData from '../data/mockData';
import CalendarioDashboard from '../components/CalendarioDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(mockData.dashboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const MetricCard = ({ icon: Icon, title, value, subtitle, color, onClick }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-full`}>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ActivityCard = ({ activity }) => {
    const getActivityIcon = (tipo) => {
      switch (tipo) {
        case 'mudanca': return <Truck className="h-5 w-5 text-blue-600" />;
        case 'visita': return <MapPin className="h-5 w-5 text-green-600" />;
        case 'box': return <Package className="h-5 w-5 text-orange-600" />;
        default: return <Activity className="h-5 w-5 text-gray-600" />;
      }
    };

    const getActivityColor = (tipo) => {
      switch (tipo) {
        case 'mudanca': return 'bg-blue-50 border-blue-200';
        case 'visita': return 'bg-green-50 border-green-200';
        case 'box': return 'bg-orange-50 border-orange-200';
        default: return 'bg-gray-50 border-gray-200';
      }
    };

    return (
      <div className={`p-4 rounded-lg border ${getActivityColor(activity.tipo)}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getActivityIcon(activity.tipo)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{activity.cliente}</p>
            <p className="text-sm text-gray-600">
              {activity.tipo === 'mudanca' && `Mudança agendada - ${formatCurrency(activity.valor)}`}
              {activity.tipo === 'visita' && `Visita confirmada - ${activity.endereco}`}
              {activity.tipo === 'box' && `${activity.box} - Status: ${activity.status}`}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(activity.data).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Visão geral do sistema VIP Mudanças</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Último acesso</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendário de Atividades - PRIMEIRO */}
        <div className="mb-8">
          <CalendarioDashboard />
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Truck}
            title="Mudanças Agendadas"
            value={metrics.mudancasAgendadas}
            subtitle="Este mês"
            color="blue"
            onClick={() => navigate('/orcamentos')}
          />
          <MetricCard
            icon={Package}
            title="Boxes Ocupados"
            value={`${metrics.boxesOcupados}/56`}
            subtitle="Self Storage"
            color="orange"
            onClick={() => navigate('/self-storage')}
          />
          <MetricCard
            icon={Users}
            title="Visitas no Mês"
            value={metrics.visitasNoMes}
            subtitle="Agendadas + Realizadas"
            color="green"
            onClick={() => navigate('/visitas')}
          />
          <MetricCard
            icon={DollarSign}
            title="Valor Previsto"
            value={formatCurrency(metrics.valorPrevisto)}
            subtitle="Receita estimada"
            color="purple"
            onClick={() => navigate('/financeiro')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Atividades Recentes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Atividades Recentes</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todas
                </button>
              </div>
              <div className="space-y-4">
                {metrics.atividadesRecentes.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Resumo Rápido */}
          <div className="space-y-6">
            {/* Módulos em Destaque */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Módulos em Destaque</h3>
              <div className="space-y-3">
                <div 
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => navigate('/leads-linkedin')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">NOVO</div>
                    <span className="font-medium text-gray-900">Leads LinkedIn</span>
                  </div>
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                
                <div 
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => navigate('/licitacoes-publicas')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">NOVO</div>
                    <span className="font-medium text-gray-900">Licitações</span>
                  </div>
                  <Star className="h-5 w-5 text-green-600" />
                </div>

                <div 
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => navigate('/programa-pontos')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">Programa de Pontos</span>
                  </div>
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Status do Sistema */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status do Sistema</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sistema</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Backup</span>
                  <span className="flex items-center text-green-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Atualizado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Usuários Ativos</span>
                  <span className="text-gray-900 font-medium">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acesso Rápido */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Acesso Rápido</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Clientes', path: '/clientes', icon: Users, color: 'blue' },
              { name: 'Orçamentos', path: '/orcamentos', icon: DollarSign, color: 'green' },
              { name: 'Contratos', path: '/contratos', icon: Package, color: 'purple' },
              { name: 'Estoque', path: '/estoque', icon: Package, color: 'orange' },
              { name: 'Financeiro', path: '/financeiro', icon: DollarSign, color: 'red' },
              { name: 'Calendário', path: '/calendario', icon: Calendar, color: 'indigo' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 border-l-4 border-${item.color}-500 hover:scale-105`}
              >
                <item.icon className={`h-8 w-8 text-${item.color}-600 mx-auto mb-2`} />
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

