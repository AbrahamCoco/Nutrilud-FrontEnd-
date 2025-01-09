import axios from "axios";

// Configura Axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080", // Base URL de tu API
});

// Exporta los métodos de la API
export const Tarjet = {
  userApi: {
    login: (data) => axiosInstance.post("/users/login", data),
    logout: (config) => axiosInstance.post("/auth/logout", {}, config),
    register: (data) => axiosInstance.post("/auth/register", data),
    upluoadImage: (data) => axiosInstance.post("/upload/image", data),
    getUser: (id) => axiosInstance.get(`/auth/user/${id}`),
  },
  adminApi: {},
  nutriologoApi: {
    getAllArticulos: () => axiosInstance.get("/tarticulos/findAllArticles"),
    getArticuloId: (id) => axiosInstance.get(`/tarticulos/findById?id=${id}`),
    getAgenda: () => axiosInstance.get("/nutriologo/agenda"),
    addArticulo: (data) => axiosInstance.post("/nutriologo/articulos", data),
    getAllPacientes: () => axiosInstance.get("/nutriologo/pacientes"),
    deletePaciente: (id) => axiosInstance.get(`/nutriologo/pacienteDelete/${id}`),
    getPacienteId: (id) => axiosInstance.get(`/nutriologo/paciente/${id}`),
    getAllConsultas: (id) => axiosInstance.get(`/nutriologo/consultadatos/${id}`),
    addConsulta: (id, data) => axiosInstance.post(`/nutriologo/insertardatos/${id}`, data),
    addRecordatorio: (data) => axiosInstance.post("/nutriologo/insertarRecordatorio", data),
    getRecordatorios: (id) => axiosInstance.get(`/nutriologo/recordatorios/${id}`),
  },
  pacienteApi: {},
};
