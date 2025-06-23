import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { 
  FileSearch, 
  Search, 
  Download, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  DollarSign,
  ExternalLink,
  Settings
} from 'lucide-react';
import { licitacoesService } from '../lib/api';
import '../App.css';

const LicitacoesPublicas = () => {
  const [licitacoes, setLicitacoes] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    abertas: 0,
    urgentes: 0,
    valor_total: 0
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  useEffect(() => {
    loadLicitacoes();
  }, []);

  const loadLicitacoes = async () => {
    try {
      setLoading(true);
      const data = await licitacoesService.getAll();
      setLicitacoes(data.licitacoes);
      setEstatisticas(data.estatisticas);
    } catch (error) {
      console.error('Erro ao carregar licitações:', error);
      // Usar dados mock em caso de erro
      setLicitacoes([
        {
          id: '1',
          numero: 'PE 001/2025',
          objeto: 'Contratação de serviços de mudança para órgão público',
          orgao: 'Prefeitura Municipal de São Paulo',
          valor_estimado: 150000,
          data_abertura: '2025-07-15T10:00:00Z',
          data_limite: '2025-07-01T17:00:00Z',
          status: 'Aberta',
          modalidade: 'Pregão Eletrônico',
          link: 'https://exemplo.com/licitacao1'
        },
        {
          id: '2',
          numero: 'CC 045/2025',
          objeto: 'Serviços de transporte e mudança de equipamentos',
          orgao: 'Governo do Estado do Rio de Janeiro',
          valor_estimado: 280000,
          data_abertura: '2025-06-30T14:00:00Z',
          data_limite: '2025-06-25T16:00:00Z',
          status: 'Urgente',
          modalidade: 'Concorrência',
          link: 'https://exemplo.com/licitacao2'
        }
      ]);
      setEstatisticas({
        total: 2,
        abertas: 1,
        urgentes: 1,
        valor_total: 430000
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredLicitacoes = licitacoes.filter(licitacao => {
    const matchesSearch = licitacao.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         licitacao.orgao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         licitacao.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || licitacao.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aberta': return 'bg-green-100 text-green-800';
      case 'Urgente': return 'bg-red-100 text-red-800';
      case 'Encerrada': return 'bg-gray-100 text-gray-800';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando licitações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Licitações Públicas" />
      
      <div className="p-6 space-y-6">
        {/* Cabeçalho com estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FileSearch className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{estatisticas.total}</h3>
                <p className="text-sm text-gray-600">Total de Licitações</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{estatisticas.abertas}</h3>
                <p className="text-sm text-gray-600">Abertas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100 text-red-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{estatisticas.urgentes}</h3>
                <p className="text-sm text-gray-600">Urgentes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <DollarSign className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">{formatCurrency(estatisticas.valor_total)}</h3>
                <p className="text-sm text-gray-600">Valor Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e busca */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar licitações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todos os Status</option>
                <option value="Aberta">Aberta</option>
                <option value="Urgente">Urgente</option>
                <option value="Encerrada">Encerrada</option>
                <option value="Em Análise">Em Análise</option>
              </select>
              
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
              
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configurar Alertas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de licitações */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Licitação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Órgão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Estimado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prazo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLicitacoes.map((licitacao) => (
                  <tr key={licitacao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {licitacao.numero}
                        </div>
                        <div className="text-sm text-gray-500">
                          {licitacao.modalidade}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 max-w-xs truncate">
                          {licitacao.objeto}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {licitacao.orgao}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(licitacao.valor_estimado)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(licitacao.data_limite)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Abertura: {formatDate(licitacao.data_abertura)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(licitacao.status)}`}>
                        {licitacao.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <a
                          href={licitacao.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-orange-600 hover:text-orange-900">
                          <AlertTriangle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLicitacoes.length === 0 && (
            <div className="text-center py-12">
              <FileSearch className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma licitação encontrada</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Configure alertas para receber notificações de novas licitações.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LicitacoesPublicas;

