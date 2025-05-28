import axios from "axios";

const baseURL = "http://127.0.0.1:8080/api/v1";
// Configura Axios
const axiosInstance = axios.create({
  baseURL,
});
// Exporta los métodos de la API
export const Tarjet = {
  userApi: {
    login: (usuario, contrasenia) => axiosInstance.get(`/personal_access_token/login?usuario=${usuario}&contrasenia=${contrasenia}`),
    register: (data) => axiosInstance.post("/users/insert", data),
    upluoadImage: (data) => axiosInstance.post("/personal_access_token/insert_archivo", data),
    getUser: (id) => axiosInstance.get(`/users/findById?id=${id}`),
  },
  adminApi: {
    getAllAdminsAndNutris: () => axiosInstance.get("/users/findAllAdminsAndNutris"),
  },
  nutriologoApi: {
    getAllArticulos: () => axiosInstance.get("/tarticulos/findAllArticles"),
    getArticuloId: (id) => axiosInstance.get(`/tarticulos/findById?id=${id}`),
    getAgenda: (id) => axiosInstance.get(`/tdatos_consultas/findAgendaByNutriologo?id=${id}`),
    addArticulo: (data) => axiosInstance.post("/tarticulos/insert", data),
    getAllPacientes: () => axiosInstance.get("/users/findAllPacientes"),
    deletePaciente: (id) => axiosInstance.get(`/users/deleteByIdPaciente?id=${id}`),
    getPacienteId: (id) => axiosInstance.get(`/users/findByIdPaciente?id=${id}`),
    getAllConsultas: (id) => axiosInstance.get(`/tdatos_consultas/findConsultasByPaciente?id=${id}`),
    addConsulta: (data) => axiosInstance.post(`/tdatos_consultas/insert`, data),
    addRecordatorio: (data) => axiosInstance.post("/t_recordatorios/insert", data),
    getRecordatorios: (id) => axiosInstance.get(`/t_recordatorios/findRecordatorioByPacienteId?id=${id}`),
  },
  pacienteApi: {},
  view: baseURL + "/view/",
  pdf: baseURL + "/files/",
};
