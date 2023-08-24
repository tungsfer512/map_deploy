import axios from 'axios';

export const assetUrl = 'http://222.252.29.85:17000/';
export const BASE_URL = axios.defaults.baseURL = 'http://222.252.29.85:17000/api/v1';
export const BASE_URL_AUTH = 'http://222.252.29.85:17000/api/auth';


export const token = JSON.parse(localStorage.getItem('token'));