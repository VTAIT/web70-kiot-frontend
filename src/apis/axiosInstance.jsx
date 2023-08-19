import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, //over 5 minutes stop calling
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["x-access-token"] = accessToken;
  }
  console.log('config.headers["x-access-token"]',config.headers["x-access-token"]);
  return config;
});

export default axiosInstance;
