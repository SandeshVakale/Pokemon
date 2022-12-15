import axios from 'axios';
import {API_URL} from '../constants';

export const api = axios.create({
  baseURL: API_URL,
  // here are some default headers
  headers: {
    'Cache-Control': 'no-cache',
  },
  // 10 second timeout...
  timeout: 10000,
});
