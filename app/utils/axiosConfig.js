import axios from 'axios';

// Configura Axios
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/', // Base URL de tu API
});

// Función para obtener el token CSRF
const getCsrfToken = async () => {
  try {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
  } catch (error) {
    console.error("Error fetching CSRF token", error);
  }
};

// Interceptor para añadir el token CSRF a cada solicitud
axiosInstance.interceptors.request.use(async (config) => {
  await getCsrfToken(); // Asegúrate de obtener el token CSRF antes de hacer la solicitud
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
