import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.API_URL || 'http://localhost:3001'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export default api;
