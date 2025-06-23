import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Star,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Users,
  Building,
  Truck
} from 'lucide-react';

const Graficos = () => {
  const [filtroMes, setFiltroMes] = useState('todos');
  const [filtroAno, setFiltroAno] = useState('2024');
  const [tipoVisualizacao, setTipoVisualizacao] = useState('geral');

  // Dados mockados para os gráficos
  const faturamentoMensal = [
    { mes: 'Jan', selfStorage: 45000, mudancas: 85000, total: 130000 },
    { mes: 'Fev', selfStorage: 48000, mudancas: 92000, total: 140000 },
    { mes: 'Mar', selfStorage: 52000, mudancas: 78000, total: 130000 },
    { mes: 'Abr', selfStorage: 55000, mudancas: 95000, total: 150000 },
    { mes: 'Mai', selfStorage: 58000, mudancas: 102000, total: 160000 },
    { mes: 'Jun', selfStorage: 62000, mudancas: 88000, total: 150000 }
  ];

  const avaliacoesClientes = [
    { mes: 'Jan', media: 4.2, total: 45 },
    { mes: 'Fev', media: 4.5, total: 52 },
    { mes: 'Mar', media: 4.3, total: 38 },
    { mes: 'Abr', media: 4.7, total: 61 },
    { mes: 'Mai', media: 4.6, total: 58 },
    { mes: 'Jun', media: 4.8, total: 47 }
  ];

  const ocupacaoBoxes = [
    { status: 'Ocupados', quantidade: 42, cor: '#10B981' },
    { status: 'Livres', quantidade: 12, cor: '#3B82F6' },
    { status: 'Manutenção', quantidade: 2, cor: '#F59E0B' }
  ];

  const consumoEstoque = [
    { item: 'Caixas', jan: 450, fev: 520, mar: 380, abr: 610, mai: 580, jun: 470 },
    { item: 'Plástico Bolha', jan: 120, fev: 140, mar: 95, abr: 165, mai: 155, jun: 125 },
    { item: 'Fita Adesiva', jan: 85, fev: 95, mar: 72, abr: 108, mai: 102, jun: 88 },
    { item: 'Papelão', jan: 200, fev: 230, mar: 175, abr: 285, mai: 270, jun: 220 }
  ];

  const vendedoresPerformance = [
    { vendedor: 'Kenneth', vendas: 12, valor: 285000, conversao: 68 },
    { vendedor: 'Douglas', vendas: 8, valor: 195000, conversao: 55 },
    { vendedor: 'Admin', vendas: 3, valor: 75000, conversao: 45 }
  ];

  const tiposMudanca = [
    { tipo: 'Residencial', quantidade: 15, valor: 375000, cor: '#8B5CF6' },
    { tipo: 'Comercial', quantidade: 8, valor: 180000, cor: '#06B6D4' },
    { tipo: 'Self Storage', quantidade: 25, valor: 125000, cor: '#10B981' }
  ];

  const evolucaoSaldo = [
    { mes: 'Jan', entrada: 130000, saida: 95000, saldo: 35000 },
    { mes: 'Fev', entrada: 140000, saida: 102000, saldo: 73000 },
    { mes: 'Mar', entrada: 130000, saida: 88000, saldo: 115000 },
    { mes: 'Abr', entrada: 150000, saida: 110000, saldo: 155000 },
    { mes: 'Mai', entrada: 160000, saida: 125000, saldo: 190000 },
    { mes: 'Jun', entrada: 150000, saida: 118000, saldo: 222000 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularMetricas = () => {
    const totalFaturamento = faturamentoMensal.reduce((sum, item) => sum + item.total, 0);
    const mediaAvaliacoes = avaliacoesClientes.reduce((sum, item) => sum + item.media, 0) / avaliacoesClientes.length;
    const totalBoxes = ocupacaoBoxes.reduce((sum, item) => sum + item.quantidade, 0);
    const taxaOcupacao = (ocupacaoBoxes.find(item => item.status === 'Ocupados')?.quantidade || 0) / totalBoxes * 100;
    const totalVendas = vendedoresPerformance.reduce((sum, item) => sum + item.vendas, 0);

    return {
      totalFaturamento,
      mediaAvaliacoes: mediaAvaliacoes.toFixed(1),
      taxaOcupacao: taxaOcupacao.toFixed(1),
      totalVendas
    };
  };

  const metricas = calcularMetricas();

  const exportarRelatorio = () => {
    alert('Relatório exportado com sucesso! (Mock)');
  };

  const atualizarDados = () => {
    alert('Dados atualizados! (Mock)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gráficos e Relatórios</h1>
              <p className="text-gray-600 mt-1">Análise visual de dados e métricas</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={atualizarDados}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Atualizar</span>
              </button>
              <button
                onClick={exportarRelatorio}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filtros:</span>
              </div>
              
              <select
                value={tipoVisualizacao}
                onChange={(e) => setTipoVisualizacao(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="geral">Visão Geral</option>
                <option value="financeiro">Financeiro</option>
                <option value="operacional">Operacional</option>
                <option value="vendas">Vendas</option>
              </select>

              <select
                value={filtroAno}
                onChange={(e) => setFiltroAno(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>

              <select
                value={filtroMes}
                onChange={(e) => setFiltroMes(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os meses</option>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Última atualização: Hoje, 14:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Faturamento Total</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metricas.totalFaturamento)}</p>
                <p className="text-sm text-green-600">+12% vs mês anterior</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avaliação Média</p>
                <p className="text-2xl font-bold text-gray-900">{metricas.mediaAvaliacoes}</p>
                <p className="text-sm text-yellow-600">⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ocupação Boxes</p>
                <p className="text-2xl font-bold text-gray-900">{metricas.taxaOcupacao}%</p>
                <p className="text-sm text-blue-600">42 de 56 boxes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vendas Fechadas</p>
                <p className="text-2xl font-bold text-gray-900">{metricas.totalVendas}</p>
                <p className="text-sm text-purple-600">Este mês</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Faturamento Mensal */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Faturamento Mensal</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">Self Storage</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Mudanças</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={faturamentoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="selfStorage" fill="#3B82F6" name="Self Storage" />
                <Bar dataKey="mudancas" fill="#10B981" name="Mudanças" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Avaliações dos Clientes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Avaliações dos Clientes</h3>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={avaliacoesClientes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[0, 5]} />
                <Tooltip formatter={(value, name) => [
                  name === 'media' ? `${value} estrelas` : `${value} avaliações`,
                  name === 'media' ? 'Média' : 'Total'
                ]} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="media" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Média de Avaliações"
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="Total de Avaliações"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segunda linha de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ocupação dos Boxes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Ocupação dos Boxes</h3>
              <PieChartIcon className="h-5 w-5 text-blue-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ocupacaoBoxes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, quantidade, percent }) => 
                    `${status}: ${quantidade} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantidade"
                >
                  {ocupacaoBoxes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} boxes`, 'Quantidade']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {ocupacaoBoxes.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <div className="flex items-center justify-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.cor }}
                    ></div>
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{item.quantidade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance dos Vendedores */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Performance dos Vendedores</h3>
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendedoresPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <YAxis dataKey="vendedor" type="category" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="valor" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {vendedoresPerformance.map((vendedor, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span className="font-medium">{vendedor.vendedor}</span>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{vendedor.vendas} vendas</p>
                    <p className="text-sm text-green-600">{vendedor.conversao}% conversão</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terceira linha de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Consumo de Estoque */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Consumo de Estoque por Mês</h3>
              <Package className="h-5 w-5 text-orange-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { mes: 'Jan', caixas: 450, plastico: 120, fita: 85, papelao: 200 },
                { mes: 'Fev', caixas: 520, plastico: 140, fita: 95, papelao: 230 },
                { mes: 'Mar', caixas: 380, plastico: 95, fita: 72, papelao: 175 },
                { mes: 'Abr', caixas: 610, plastico: 165, fita: 108, papelao: 285 },
                { mes: 'Mai', caixas: 580, plastico: 155, fita: 102, papelao: 270 },
                { mes: 'Jun', caixas: 470, plastico: 125, fita: 88, papelao: 220 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="caixas" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Caixas" />
                <Area type="monotone" dataKey="plastico" stackId="1" stroke="#10B981" fill="#10B981" name="Plástico Bolha" />
                <Area type="monotone" dataKey="fita" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Fita Adesiva" />
                <Area type="monotone" dataKey="papelao" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="Papelão" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Evolução do Saldo */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Evolução do Saldo</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolucaoSaldo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="entrada" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Entradas"
                />
                <Line 
                  type="monotone" 
                  dataKey="saida" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Saídas"
                />
                <Line 
                  type="monotone" 
                  dataKey="saldo" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Saldo Acumulado"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tipos de Mudança */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Distribuição por Tipo de Mudança</h3>
            <Activity className="h-5 w-5 text-indigo-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiposMudanca.map((tipo, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{tipo.tipo}</h4>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: tipo.cor }}
                  ></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Quantidade:</span>
                    <span className="font-medium">{tipo.quantidade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Valor Total:</span>
                    <span className="font-medium">{formatCurrency(tipo.valor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Valor Médio:</span>
                    <span className="font-medium">{formatCurrency(tipo.valor / tipo.quantidade)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights e Recomendações */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">💡 Insights e Recomendações</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border-l-4 border-green-400">
              <h4 className="font-medium text-green-800">📈 Crescimento Positivo</h4>
              <p className="text-sm text-gray-600 mt-1">
                Faturamento cresceu 12% em relação ao mês anterior. Self Storage mostra tendência de alta.
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800">⭐ Excelente Avaliação</h4>
              <p className="text-sm text-gray-600 mt-1">
                Média de 4.8 estrelas nas avaliações. Manter foco na qualidade do atendimento.
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-800">🏢 Alta Ocupação</h4>
              <p className="text-sm text-gray-600 mt-1">
                75% dos boxes ocupados. Considerar expansão ou otimização de preços.
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-purple-400">
              <h4 className="font-medium text-purple-800">📦 Gestão de Estoque</h4>
              <p className="text-sm text-gray-600 mt-1">
                Consumo de caixas em alta. Revisar fornecedores para otimizar custos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficos;

