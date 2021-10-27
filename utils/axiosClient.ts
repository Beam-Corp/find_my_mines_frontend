import Axios from 'axios';
export const client = Axios.create({baseURL: process.env.API_URL || "http://localhost:8000"})