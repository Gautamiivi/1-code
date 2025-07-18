import axios from "axios";

// ✅ Create Axios instance with dynamic baseURL
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  // ✅ Auto-picks from .env
  withCredentials: true, 
  // ✅ Send cookies with requests if needed
});

// 📝 Debug log: Print base URL at startup
console.log("🌐 Axios Base URL:", instance.defaults.baseURL);

// ✅ Attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Global error handling (optional)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token"); // Clear token
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;
