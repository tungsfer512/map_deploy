import axios from 'axios';

// export const assetUrl = 'http://26.188.5.187:5000/';
// export const BASE_URL = axios.defaults.baseURL = 'http://26.188.5.187:5000/api/v1';
// export const BASE_URL_AUTH = 'http://26.188.5.187:5000/api/auth';
export const assetUrl = 'http://203.162.10.118:7000/';
export const BASE_URL = axios.defaults.baseURL = 'http://203.162.10.118:7000/api/v1';
export const BASE_URL_AUTH = 'http://203.162.10.118:7000/api/auth';


export const token = JSON.parse(localStorage.getItem('token'));