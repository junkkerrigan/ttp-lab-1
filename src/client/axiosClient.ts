import axios from 'axios';

const API_BASE_URL = '/api/v1';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});
