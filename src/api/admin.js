import axios from 'axios';

const API_URL = 'http://localhost:8080/admin';

export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};
