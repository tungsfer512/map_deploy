import axios from 'axios';

// export const assetUrl = 'http://26.188.5.187:5000/';
// export const BASE_URL = axios.defaults.baseURL = 'http://26.188.5.187:5000/api/v1';
// export const BASE_URL_AUTH = 'http://26.188.5.187:5000/api/auth';
export const assetUrl = 'http://127.0.0.1:7000/';
export const BASE_URL = axios.defaults.baseURL = 'http://127.0.0.1:7000/api/v1';
export const BASE_URL_AUTH = 'http://127.0.0.1:7000/api/auth';


export const token = JSON.parse(localStorage.getItem('token'));