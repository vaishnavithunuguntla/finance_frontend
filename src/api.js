// here we need to add our connection to fastapi

import axios from "axios";

const api = axios.create({
  baseURL: "https://finance-backend-5ghn.onrender.com", 
  headers: { "Content-Type": "application/json" }
});

export default api;
