import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  TrendingUp, 
  Users, 
  Award, 
  Target,
  Calendar,
  Filter,
  Download,
  Eye,
  Medal,
  Crown,
  Zap,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
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
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const ProgramaPontos = () => {
  const [abaSelecionada, setAbaSelecionada] = useState('comercial');
  const [mesSelecionado, setMesSelecionado] = useState('2024-06');
  const [usuarioLogado] = useState({
    id: 1,
    nome: 'Kenneth Silva',
    cargo: 'Vendedor',
    setor: 'comercial'
  });

  // Dados mockados da equipe comercial
  const [equipeComercial] = useState([
    {
      id: 1,
      nome: 'Kenneth Silva',
      cargo: 'Vendedor Senior',
      mudancasFechadas: 8,
      pontuacao: 800,
      posicao: 1,
      avatar: '👨‍💼',
      meta: 10,
      crescimento: 15
    },
    {
      id: 2,
      nome: 'Douglas Santos',
      cargo: 'Vendedor',
      mudancasFechadas: 6,
      pontuacao: 600,
      posicao: 2,
      avatar: '👨‍💻',
      meta: 8,
      crescimento: -5
    },
    {
      id: 3,
      nome: 'Ana Costa',
      cargo: 'Vendedora',
      mudancasFechadas: 5,
      pontuacao: 500,
      posicao: 3,
      avatar: '👩‍💼',
      meta: 7,
      crescimento: 20
    }
  ]);

  // Dados mockados da equipe operacional
  const [equipeOperacional] = useState([
    {
      id: 4,
      nome: 'Maciel Oliveira',
      cargo: 'Motorista/Embalador',
      atendimentos: 12,
      mediaAvaliacao: 4.8,
      pontuacao: 1140,
      posicao: 1,
      avatar: '🚛',
      avaliacoes: [5, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5]
    },
    {
      id: 5,
      nome: 'Diego Silva',
      cargo: 'Motorista/Embalador',
      atendimentos: 10,
      mediaAvaliacao: 4.6,
      pontuacao: 920,
      posicao: 2,
      avatar: '📦',
      avaliacoes: [5, 4, 5, 4, 5, 4, 5, 5, 4, 5]
    },
    {
      id: 6,
      nome: 'Sebastião Costa',
      cargo: 'Montador',
      atendimentos: 8,
      mediaAvaliacao: 4.9,
      pontuacao: 780,
      posicao: 3,
      avatar: '🔧',
      avaliacoes: [5, 5, 5, 4, 5, 5, 5, 5]
    },
    {
      id: 7,
      nome: 'Barreto Santos',
      cargo: 'Embalador',
      atendimentos: 15,
      mediaAvaliacao: 4.4,
      pontuacao: 1050,
      posicao: 4,
      avatar: '📋',
      avaliacoes: [4, 5, 4, 4, 5, 3, 5, 4, 5, 4, 4, 5, 4, 4, 5]
    },
    {
      id: 8,
      nome: 'Carlinhos Lima',
      cargo: 'Embalador',
      atendimentos: 11,
      mediaAvaliacao: 4.3,
      pontuacao: 770,
      posicao: 5,
      avatar: '📦',
      avaliacoes: [4, 4, 5, 4, 3, 5, 4, 4, 5, 4, 4]
    }
  ]);

  // Dados para gráficos
  const dadosEvolutivo = [
    { mes: 'Jan', comercial: 450, operacional: 680 },
    { mes: 'Fev', comercial: 520, operacional: 720 },
    { mes: 'Mar', comercial: 480, operacional: 650 },
    { mes: 'Abr', comercial: 600, operacional: 890 },
    { mes: 'Mai', comercial: 750, operacional: 950 },
    { mes: 'Jun', comercial: 800, operacional: 1140 }
  ];

  const dadosDistribuicao = [
    { name: '5 Estrelas', value: 65, color: '#10B981' },
    { name: '4 Estrelas', value: 25, color: '#3B82F6' },
    { name: '3 Estrelas', value: 8, color: '#F59E0B' },
    { name: '2 Estrelas', value: 2, color: '#EF4444' }
  ];

  const calcularPontosAvaliacao = (nota) => {
    const pontos = {
      5: 100,
      4: 70,
      3: 40,
      2: 10,
      1: -50
    };
    return pontos[nota] || 0;
  };

  const obterCorPosicao = (posicao) => {
    switch(posicao) {
      case 1: return 'text-yellow-600 bg-yellow-50';
      case 2: return 'text-gray-600 bg-gray-50';
      case 3: return 'text-amber-600 bg-amber-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const obterIconePosicao = (posicao) => {
    switch(posicao) {
      case 1: return <Crown className="h-5 w-5" />;
      case 2: return <Medal className="h-5 w-5" />;
      case 3: return <Award className="h-5 w-5" />;
      default: return <Trophy className="h-5 w-5" />;
    }
  };

  const renderRankingComercial = () => (
    <div className="space-y-4">
      {equipeComercial.map((membro) => (
        <div 
          key={membro.id} 
          className={`bg-white rounded-lg border p-6 transition-all duration-200 hover:shadow-md ${
            membro.id === usuarioLogado.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${obterCorPosicao(membro.posicao)}`}>
                {membro.posicao <= 3 ? obterIconePosicao(membro.posicao) : membro.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center">
                  {membro.nome}
                  {membro.id === usuarioLogado.id && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Você
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600">{membro.cargo}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{membro.mudancasFechadas}</p>
                <p className="text-sm text-gray-600">Mudanças</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{membro.pontuacao}</p>
                <p className="text-sm text-gray-600">Pontos</p>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${obterCorPosicao(membro.posicao)}`}>
                  {obterIconePosicao(membro.posicao)}
                  <span className="ml-1">#{membro.posicao}</span>
                </div>
              </div>
              <div className="text-center">
                <div className={`flex items-center ${membro.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {membro.crescimento >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="ml-1 text-sm font-medium">{Math.abs(membro.crescimento)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progresso da Meta</span>
              <span>{membro.mudancasFechadas}/{membro.meta}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((membro.mudancasFechadas / membro.meta) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRankingOperacional = () => (
    <div className="space-y-4">
      {equipeOperacional.map((membro) => (
        <div 
          key={membro.id} 
          className={`bg-white rounded-lg border p-6 transition-all duration-200 hover:shadow-md ${
            membro.id === usuarioLogado.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${obterCorPosicao(membro.posicao)}`}>
                {membro.posicao <= 3 ? obterIconePosicao(membro.posicao) : membro.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center">
                  {membro.nome}
                  {membro.id === usuarioLogado.id && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Você
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600">{membro.cargo}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{membro.atendimentos}</p>
                <p className="text-sm text-gray-600">Atendimentos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-xl font-bold text-gray-900">{membro.mediaAvaliacao}</span>
                </div>
                <p className="text-sm text-gray-600">Média</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{membro.pontuacao}</p>
                <p className="text-sm text-gray-600">Pontos</p>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${obterCorPosicao(membro.posicao)}`}>
                  {obterIconePosicao(membro.posicao)}
                  <span className="ml-1">#{membro.posicao}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Últimas Avaliações:</p>
            <div className="flex space-x-1">
              {membro.avaliacoes.slice(-10).map((nota, index) => (
                <div key={index} className="flex">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <Star 
                      key={estrela}
                      className={`h-3 w-3 ${
                        estrela <= nota 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                Programa de Pontos
              </h1>
              <p className="text-gray-600 mt-2">Sistema de gamificação e ranking da equipe VIP Mudanças</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={mesSelecionado}
                onChange={(e) => setMesSelecionado(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2024-06">Junho 2024</option>
                <option value="2024-05">Maio 2024</option>
                <option value="2024-04">Abril 2024</option>
                <option value="2024-03">Março 2024</option>
              </select>
              
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Colaboradores</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mudanças Fechadas</p>
                <p className="text-2xl font-bold text-gray-900">19</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Média Avaliações</p>
                <p className="text-2xl font-bold text-gray-900">4.6</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pontos</p>
                <p className="text-2xl font-bold text-gray-900">6,560</p>
              </div>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="bg-white rounded-lg border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setAbaSelecionada('comercial')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  abaSelecionada === 'comercial'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Equipe Comercial
                </div>
              </button>
              <button
                onClick={() => setAbaSelecionada('operacional')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  abaSelecionada === 'operacional'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Equipe Operacional
                </div>
              </button>
              <button
                onClick={() => setAbaSelecionada('graficos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  abaSelecionada === 'graficos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Gráficos
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {abaSelecionada === 'comercial' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Ranking Comercial</h2>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Regra:</span> +100 pontos por mudança fechada
                  </div>
                </div>
                {renderRankingComercial()}
              </div>
            )}

            {abaSelecionada === 'operacional' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Ranking Operacional</h2>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Regra:</span> Pontos baseados em avaliações (5★=100pts, 4★=70pts, 3★=40pts, 2★=10pts, 1★=-50pts)
                  </div>
                </div>
                {renderRankingOperacional()}
              </div>
            )}

            {abaSelecionada === 'graficos' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Análise de Performance</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gráfico de Evolução */}
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Evolução de Pontos</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dadosEvolutivo}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mes" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="comercial" 
                            stroke="#3B82F6" 
                            strokeWidth={3}
                            name="Comercial"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="operacional" 
                            stroke="#10B981" 
                            strokeWidth={3}
                            name="Operacional"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Gráfico de Distribuição de Avaliações */}
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Distribuição de Avaliações</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={dadosDistribuicao}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {dadosDistribuicao.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Insights */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Zap className="h-5 w-5 text-blue-600 mr-2" />
                    Insights do Mês
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center text-green-600 mb-2">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        <span className="font-medium">Destaque</span>
                      </div>
                      <p className="text-sm text-gray-700">Kenneth lidera vendas com 8 mudanças fechadas</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center text-blue-600 mb-2">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="font-medium">Qualidade</span>
                      </div>
                      <p className="text-sm text-gray-700">Sebastião mantém média 4.9 em avaliações</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center text-purple-600 mb-2">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="font-medium">Crescimento</span>
                      </div>
                      <p className="text-sm text-gray-700">Ana Costa cresceu 20% em vendas</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramaPontos;

