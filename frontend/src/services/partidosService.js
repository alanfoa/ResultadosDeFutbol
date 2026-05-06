import axios from 'axios';

const API_URL = '/api';

export const partidosService = {
  getPartidosHoy: () => axios.get(`${API_URL}/partidos/hoy`),
  getPartido: (id) => axios.get(`${API_URL}/partidos/${id}`),
  getLigas: () => axios.get(`${API_URL}/ligas`),
  getTablaPosicion: (ligaId) => axios.get(`${API_URL}/tabla-posicion/liga/${ligaId}`),
  getGoleadores: (ligaId) => axios.get(`${API_URL}/goleadores/liga/${ligaId}`),
  getAsistidores: (ligaId) => axios.get(`${API_URL}/asistidores/liga/${ligaId}`),
  getAmarillas: (ligaId) => axios.get(`${API_URL}/amarillas/liga/${ligaId}`),
};
