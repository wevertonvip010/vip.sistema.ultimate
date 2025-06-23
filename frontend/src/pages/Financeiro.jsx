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
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Building,
  Truck,
  Plus,
  Download,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Package
} from 'lucide-react';

const Financeiro = () => {
  const [abaAtiva, setAbaAtiva] = useState('consolidado');
  const [filtroMes, setFiltroMes] = useState('todos');
  const [filtroAno, setFiltroAno] = useState('2024');
  const [modalTransacao, setModalTransacao] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState('entrada');

  // Dados mockados para Self Storage
  const selfStorageData = {
    receitas: [
      { mes: 'Jan', valor: 45000, boxes: 38 },
      { mes: 'Fev', valor: 48000, boxes: 40 },
      { mes: 'Mar', valor: 52000, boxes: 42 },
      { mes: 'Abr', valor: 55000, boxes: 44 },
      { mes: 'Mai', valor: 58000, boxes: 46 },
      { mes: 'Jun', valor: 62000, boxes: 48 }
    ],
    despesas: [
      { categoria: 'Aluguel', valor: 15000, tipo: 'fixo' },
      { categoria: 'Energia', valor: 3500, tipo: 'variavel' },
      { categoria: 'Segurança', valor: 4200, tipo: 'fixo' },
      { categoria: 'Limpeza', valor: 2800, tipo: 'fixo' },
      { categoria: 'Manutenção', valor: 1500, tipo: 'variavel' },
      { categoria: 'Marketing', valor: 2000, tipo: 'variavel' }
    ],
    transacoes: [
      { id: 1, data: '21/06/2024', descricao: 'Box 15 - Maria Silva', valor: 1200, tipo: 'entrada' },
      { id: 2, data: '20/06/2024', descricao: 'Box 23 - João Santos', valor: 1200, tipo: 'entrada' },
      { id: 3, data: '19/06/2024', descricao: 'Conta de Energia', valor: 3500, tipo: 'saida' },
      { id: 4, data: '18/06/2024', descricao: 'Box 08 - Ana Costa', valor: 1200, tipo: 'entrada' },
      { id: 5, data: '17/06/2024', descricao: 'Serviço de Limpeza', valor: 800, tipo: 'saida' }
    ]
  };

  // Dados mockados para Mudanças
  const mudancasData = {
    receitas: [
      { mes: 'Jan', valor: 85000, servicos: 12 },
      { mes: 'Fev', valor: 92000, servicos: 14 },
      { mes: 'Mar', valor: 78000, servicos: 11 },
      { mes: 'Abr', valor: 95000, servicos: 15 },
      { mes: 'Mai', valor: 102000, servicos: 16 },
      { mes: 'Jun', valor: 88000, servicos: 13 }
    ],
    despesas: [
      { categoria: 'Combustível', valor: 8500, tipo: 'variavel' },
      { categoria: 'Manutenção Veículos', valor: 4200, tipo: 'variavel' },
      { categoria: 'Salários Equipe', valor: 25000, tipo: 'fixo' },
      { categoria: 'Seguro Veículos', valor: 3800, tipo: 'fixo' },
      { categoria: 'Material Embalagem', valor: 2500, tipo: 'variavel' },
      { categoria: 'Licenças/Taxas', valor: 1200, tipo: 'fixo' }
    ],
    transacoes: [
      { id: 1, data: '21/06/2024', descricao: 'Mudança Residencial - Carlos Silva', valor: 8500, tipo: 'entrada' },
      { id: 2, data: '20/06/2024', descricao: 'Mudança Comercial - Tech Corp', valor: 12000, tipo: 'entrada' },
      { id: 3, data: '19/06/2024', descricao: 'Combustível - Posto Shell', valor: 850, tipo: 'saida' },
      { id: 4, data: '18/06/2024', descricao: 'Mudança Residencial - Ana Costa', valor: 6500, tipo: 'entrada' },
      { id: 5, data: '17/06/2024', descricao: 'Salários Equipe Operacional', valor: 8500, tipo: 'saida' }
    ]
  };

  // Dados consolidados
  const dadosConsolidados = [
    { 
      mes: 'Jan', 
      selfStorage: 45000, 
      mudancas: 85000, 
      total: 130000,
      despesasSelf: 29000,
      despesasMudancas: 45200,
      lucro: 55800
    },
    { 
      mes: 'Fev', 
      selfStorage: 48000, 
      mudancas: 92000, 
      total: 140000,
      despesasSelf: 29000,
      despesasMudancas: 45200,
      lucro: 65800
    },
    { 
      mes: 'Mar', 
      selfStorage: 52000, 
      mudancas: 78000, 
      total: 130000,
      despesasSelf: 29000,
      despesasMudancas: 45200,
      lucro: 55800
    },
    { 
      mes: 'Abr', 
      selfStorage: 55000, 
      mudancas: 95000, 
      total: 150000,
      despesasSelf: 29000,
      despesasMudancas: 45200,
      lucro: 75800
    },
    { 
      mes: 'Mai', 
      selfStorage: 58000, 
      mudancas: 102000, 
      total: 160000,
      despesasSelf: 29000,
      despesasMudancas: 45200,
      lucro: 85800
    },
    { 
      mes: 'Jun', 
      selfStorage: 62000, 
      mudancas: 88000, 
      total: 150000,
      despesasSelf: 29000,
      despesasMudancas: 45200,
      lucro: 75800
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularTotais = (dados) => {
    const totalReceitas = dados.reduce((sum, item) => sum + item.valor, 0);
    const mediaReceitas = totalReceitas / dados.length;
    return { totalReceitas, mediaReceitas };
  };

  const calcularDespesas = (despesas) => {
    return despesas.reduce((sum, item) => sum + item.valor, 0);
  };

  const selfStorageTotais = calcularTotais(selfStorageData.receitas);
  const mudancasTotais = calcularTotais(mudancasData.receitas);
  const selfStorageDespesas = calcularDespesas(selfStorageData.despesas);
  const mudancasDespesas = calcularDespesas(mudancasData.despesas);

  const adicionarTransacao = () => {
    alert('Transação adicionada com sucesso! (Mock)');
    setModalTransacao(false);
  };

  const exportarRelatorio = () => {
    alert('Relatório exportado com sucesso! (Mock)');
  };

  const renderAbaConsolidado = () => (
    <div className="space-y-6">
      {/* Métricas Consolidadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(selfStorageTotais.totalReceitas + mudancasTotais.totalReceitas)}
              </p>
              <p className="text-sm text-green-600">+8% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Self Storage</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(selfStorageTotais.totalReceitas)}
              </p>
              <p className="text-sm text-blue-600">48 boxes ativos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Mudanças</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(mudancasTotais.totalReceitas)}
              </p>
              <p className="text-sm text-purple-600">13 serviços/mês</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Lucro Líquido</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(75800)}
              </p>
              <p className="text-sm text-orange-600">Margem: 50.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Comparativo */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Receitas Comparativas</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Self Storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">Mudanças</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosConsolidados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="selfStorage" fill="#3B82F6" name="Self Storage" />
            <Bar dataKey="mudancas" fill="#8B5CF6" name="Mudanças" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Evolução do Lucro */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Evolução do Lucro</h3>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosConsolidados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Receita Total"
            />
            <Line 
              type="monotone" 
              dataKey="lucro" 
              stroke="#F59E0B" 
              strokeWidth={3}
              name="Lucro Líquido"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAbaSelfStorage = () => (
    <div className="space-y-6">
      {/* Métricas Self Storage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Receita Mensal</p>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(selfStorageTotais.totalReceitas)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Despesas Mensais</p>
              <p className="text-2xl font-bold text-red-900">
                {formatCurrency(selfStorageDespesas)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Lucro Líquido</p>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(selfStorageTotais.totalReceitas - selfStorageDespesas)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Receitas Self Storage */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Receitas Self Storage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={selfStorageData.receitas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Area type="monotone" dataKey="valor" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Despesas Self Storage */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Despesas Self Storage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selfStorageData.despesas.map((despesa, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{despesa.categoria}</p>
                <p className="text-sm text-gray-600 capitalize">{despesa.tipo}</p>
              </div>
              <p className="font-bold text-gray-900">{formatCurrency(despesa.valor)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transações Self Storage */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Últimas Transações</h3>
          <button
            onClick={() => setModalTransacao(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Transação</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selfStorageData.transacoes.map((transacao) => (
                <tr key={transacao.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transacao.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transacao.descricao}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(transacao.valor)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transacao.tipo === 'entrada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transacao.tipo === 'entrada' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {transacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAbaMudancas = () => (
    <div className="space-y-6">
      {/* Métricas Mudanças */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Receita Mensal</p>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(mudancasTotais.totalReceitas)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">Despesas Mensais</p>
              <p className="text-2xl font-bold text-red-900">
                {formatCurrency(mudancasDespesas)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Lucro Líquido</p>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(mudancasTotais.totalReceitas - mudancasDespesas)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Receitas Mudanças */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Receitas Mudanças</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mudancasData.receitas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Area type="monotone" dataKey="valor" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Despesas Mudanças */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Despesas Mudanças</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mudancasData.despesas.map((despesa, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{despesa.categoria}</p>
                <p className="text-sm text-gray-600 capitalize">{despesa.tipo}</p>
              </div>
              <p className="font-bold text-gray-900">{formatCurrency(despesa.valor)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transações Mudanças */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Últimas Transações</h3>
          <button
            onClick={() => setModalTransacao(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Transação</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mudancasData.transacoes.map((transacao) => (
                <tr key={transacao.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transacao.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transacao.descricao}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(transacao.valor)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transacao.tipo === 'entrada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transacao.tipo === 'entrada' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {transacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
              <p className="text-gray-600 mt-1">Gestão financeira Self Storage e Mudanças</p>
            </div>
            <div className="flex items-center space-x-3">
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

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Última atualização: Hoje, 15:30</span>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setAbaAtiva('consolidado')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === 'consolidado'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Consolidado</span>
                </div>
              </button>
              <button
                onClick={() => setAbaAtiva('selfstorage')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === 'selfstorage'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Self Storage</span>
                </div>
              </button>
              <button
                onClick={() => setAbaAtiva('mudancas')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === 'mudancas'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Mudanças</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {abaAtiva === 'consolidado' && renderAbaConsolidado()}
            {abaAtiva === 'selfstorage' && renderAbaSelfStorage()}
            {abaAtiva === 'mudancas' && renderAbaMudancas()}
          </div>
        </div>
      </div>

      {/* Modal Nova Transação */}
      {modalTransacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Nova Transação</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={tipoTransacao}
                  onChange={(e) => setTipoTransacao(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input
                  type="text"
                  placeholder="Descrição da transação"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input
                  type="number"
                  placeholder="0,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setModalTransacao(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={adicionarTransacao}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Financeiro;

