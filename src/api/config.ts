import type { AxiosInstance } from 'axios';
import axios from 'axios';

const BASE_URL = '/api/v2';

export const baseApi: AxiosInstance = axios.create({
   baseURL:  BASE_URL,
   // baseURL:  import.meta.env.VITE_API_URL + BASE_URL,
});

baseApi.defaults.headers.common['Content-Type'] = 'application/json';