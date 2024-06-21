import type { AxiosInstance } from 'axios';
import axios from 'axios';

const BASE_URL = '/api/v2';

export const baseApi: AxiosInstance = axios.create({
   baseURL:  BASE_URL,
});

baseApi.defaults.headers.common['Content-Type'] = 'application/json';