import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  // baseURL: "https://barbe0r-c95q.onrender.com",
  baseURL: "http://localhost:3000",
  timeout: 10000,  
  headers: {
    'Content-Type': 'application/json',
   },
});

export default instance;