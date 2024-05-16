import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://beta.rectoverso.exchange/api/v2";

export const baseApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

baseApi.defaults.headers.common["Content-Type"] = "application/json";
