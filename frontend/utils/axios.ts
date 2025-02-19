import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // Ensure backend is running on this port
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Get JWT token from local storage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;