import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: "https://barber-c95q.onrender.com/",
  timeout: 10000,  
  headers: {
    'Content-Type': 'application/json',
   },
});

export default instance;