import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getHistory = () => {
  return axios.get(`${API_URL}/history`);
};

export const updateHistoryItem = (id, barcode) => {
  return axios.put(`${API_URL}/history/${id}`, { barcode });
};

export const deleteHistoryItem = (id) => {
  return axios.delete(`${API_URL}/history/${id}`);
};
