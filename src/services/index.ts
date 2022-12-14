import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  // here are some default headers
  headers: {
    'Cache-Control': 'no-cache',
  },
  // 10 second timeout...
  timeout: 10000,
});
