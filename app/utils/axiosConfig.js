import axios from "axios";

// Configura Axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1", // Base URL de tu API
});

// Función para obtener el token CSRF
const getCsrfToken = async () => {
  try {
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
  } catch (error) {
    console.error("Error fetching CSRF token", error);
  }
};

// Interceptor para añadir el token CSRF a cada solicitud
axiosInstance.interceptors.request.use(
  async (config) => {
    await getCsrfToken(); // Asegúrate de obtener el token CSRF antes de hacer la solicitud
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exporta los métodos de la API
export const Tarjet = {
  userApi: {
    login: (data) => axiosInstance.post("/auth/login", data),
    logout: () => axiosInstance.post("/auth/logout"),
    register: (data) => axiosInstance.post("/auth/register", data),
    upluoadImage: (data) => axiosInstance.post("/upload/image", data),
    getUser: (id) => axiosInstance.get(`/auth/user/${id}`),
  },
  adminApi: {},
  nutriologoApi: {
    getAllArticulos: () => axiosInstance.get("/nutriologo/"),
    getArticuloId: (id) => axiosInstance.get(`/nutriologo/articulo/${id}`),
    getAgenda: () => axiosInstance.get("/nutriologo/agenda"),
    addArticulo: (data) => axiosInstance.post("/nutriologo/articulo", data),
    getAllPacientes: () => axiosInstance.get("/nutriologo/pacientes"),
    getPacienteId: (id) => axiosInstance.get(`/nutriologo/paciente/${id}`),
    getAllConsultas: (id) => axiosInstance.get(`/nutriologo/consultadatos/${id}`),
    addConsulta: (id, data) => axiosInstance.post(`/nutriologo/insertardatos/${id}`, data),
  },
  pacienteApi: {},
};

export default axiosInstance;
