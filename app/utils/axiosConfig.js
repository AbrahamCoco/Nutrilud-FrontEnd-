import axios from "axios";

// Configura Axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/v1", // Base URL de tu API
});
// Exporta los métodos de la API
export const Tarjet = {
  userApi: {
    login: (usuario, contrasenia) => axiosInstance.get(`/personal_access_token/login?usuario=${usuario}&contrasenia=${contrasenia}`), // Listo
    logout: (config) => axiosInstance.post("/auth/logout", {}, config), // Cambiar la logica de logout
    register: (data) => axiosInstance.post("/users/insert", data), // Listo
    upluoadImage: (data) => axiosInstance.post("/personal_access_token/insert_archivo", data), // Listo
    getUser: (id) => axiosInstance.get(`/users/findById?id=${id}`), // Listo
  },
  adminApi: {},
  nutriologoApi: {
    getAllArticulos: () => axiosInstance.get("/tarticulos/findAllArticles"), // Listo
    getArticuloId: (id) => axiosInstance.get(`/tarticulos/findById?id=${id}`), // Listo
    getAgenda: (id) => axiosInstance.get(`/tdatos_consultas/findAgendaByNutriologo?id=${id}`), // Listo pero modificar la agenda por nutriologo
    addArticulo: (data) => axiosInstance.post("/tarticulos/insert", data), // Listo
    getAllPacientes: () => axiosInstance.get("/users/findAllPacientes"), // Listo
    deletePaciente: (id) => axiosInstance.get(`/users/deleteByIdPaciente?id=${id}`), // Listo
    getPacienteId: (id) => axiosInstance.get(`/users/findByIdPaciente?id=${id}`), // Listo
    getAllConsultas: (id) => axiosInstance.get(`/tdatos_consultas/findConsultasByPaciente?id=${id}`), // Listo
    addConsulta: (data) => axiosInstance.post(`/tdatos_consultas/insert`, data), // Listo
    addRecordatorio: (data) => axiosInstance.post("/t_recordatorios/insert", data), // Listo
    getRecordatorios: (id) => axiosInstance.get(`/t_recordatorios/findRecordatorioByPacienteId?id=${id}`), // Listo
  },
  pacienteApi: {},
};
