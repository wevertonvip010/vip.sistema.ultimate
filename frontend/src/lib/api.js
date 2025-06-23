import axios from 'axios';

const API_BASE_URL = 'https://5000-ij2j1gakl3ypey5yh1f2o-09647d20.manusvm.computer/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Serviços de dashboard
export const dashboardService = {
  getMetricas: async () => {
    const response = await api.get('/dashboard/metricas');
    return response.data;
  },
  
  getAtividadesRecentes: async () => {
    const response = await api.get('/dashboard/atividades-recentes');
    return response.data;
  },
  
  getCalendario: async () => {
    const response = await api.get('/dashboard/calendario');
    return response.data;
  },
  
  getNotificacoes: async () => {
    const response = await api.get('/dashboard/notificacoes');
    return response.data;
  },
  
  getResumoModulos: async () => {
    const response = await api.get('/dashboard/resumo-modulos');
    return response.data;
  },
};

// Serviços de clientes
export const clientesService = {
  getAll: async () => {
    const response = await api.get('/clientes');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/clientes', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/clientes/${id}`, data);
    return response.data;
  },
  
  updateStatus: async (id, status, justificativa = '') => {
    const response = await api.put(`/clientes/${id}/status`, { status, justificativa });
    return response.data;
  },
  
  preCadastro: async (data) => {
    const response = await api.post('/clientes/pre-cadastro', data);
    return response.data;
  },
};

// Serviços de leads
export const leadsService = {
  getAll: async () => {
    const response = await api.get('/leads');
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/leads', data);
    return response.data;
  },
  
  capturar: async (filtros) => {
    const response = await api.post('/leads/capturar', { filtros });
    return response.data;
  },
  
  exportar: async () => {
    const response = await api.get('/leads/exportar');
    return response.data;
  },
};

// Serviços de licitações
export const licitacoesService = {
  getAll: async () => {
    const response = await api.get('/licitacoes');
    return response.data;
  },
  
  buscar: async (palavrasChave) => {
    const response = await api.post('/licitacoes/buscar', { palavras_chave: palavrasChave });
    return response.data;
  },
  
  configurarMonitoramento: async (config) => {
    const response = await api.post('/licitacoes/monitorar', config);
    return response.data;
  },
  
  getEstatisticas: async () => {
    const response = await api.get('/licitacoes/estatisticas');
    return response.data;
  },
};

export default api;

