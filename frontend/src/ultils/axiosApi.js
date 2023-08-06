import axios from 'axios';

export const assetUrl = 'http://localhost:7000/';
export const BASE_URL = axios.defaults.baseURL = 'http://localhost:7000/api/v1';
export const BASE_URL_AUTH = 'http://localhost:7000/api/auth';


export const token = JSON.parse(localStorage.getItem('token'));