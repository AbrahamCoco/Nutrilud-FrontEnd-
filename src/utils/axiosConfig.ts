import { ConsultaFormulario } from "@/interfaces/nutriologo/consultaFormulario.d";
import type { ResponseApi } from "@/interfaces/responseApi";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL: string = "http://54.165.182.210:8080/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

// 🔐 Rutas públicas (sin token)
const publicRoutes = [
  "/personal_access_token/login",
  "/personal_access_token/get_secret_key",
  "/tarticulos/findAllArticles",
  "/tarticulos/findById",
  "/view/",
  "/files/",
];

let isRedirecting = false;

// -------------------- REQUEST INTERCEPTOR --------------------
axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url ?? "";

    const isPublic = publicRoutes.some(route =>
      url.startsWith(route)
    );

    if (isPublic) {
      return config;
    }

    const token = sessionStorage.getItem("token");

    if (!token) {
      // 🔴 Sesión inválida
      sessionStorage.clear();

      if (!isRedirecting) {
        isRedirecting = true;
        window.location.href = '/login';
      }

      // 🔴 Cancelar request
      return Promise.reject({
        isAuthError: true,
        message: "Sesión expirada o no válida",
      });
    }

    // 🟢 Token válido
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- RESPONSE INTERCEPTOR --------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      if (!isRedirecting) {
        isRedirecting = true;
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// -------------------- API --------------------
export const Tarjet = {
  userApi: {
    login: (usuario: string, contrasenia: string): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post(`/personal_access_token/login`, { usuario, contrasenia }),

    register: (data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post("/users/insert", data, config),

    upluoadImage: (data: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post("/personal_access_token/insert_archivo", data, config),

    getUser: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/users/findById`, { params: { id } }),
  },

  adminApi: {
    getAllAdminsAndNutris: (): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get("/users/findAllAdminsAndNutris"),
  },

  nutriologoApi: {
    getAllArticulos: (): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get("/tarticulos/findAllArticles"),

    getArticuloId: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/tarticulos/findById`, { params: { id } }),

    getAgenda: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/tdatos_consultas/findAgendaByNutriologo`, { params: { id } }),

    addArticulo: (data: any): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post("/tarticulos/insert", data),

    getAllPacientes: (): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get("/users/findAllPacientes"),

    deletePaciente: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/users/deleteByIdPaciente`, { params: { id } }),

    getPacienteId: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/users/findByIdPaciente`, { params: { id } }),

    getAllConsultas: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/tdatos_consultas/findConsultasByPaciente`, { params: { id } }),

    addConsulta: (data: ConsultaFormulario, config?: AxiosRequestConfig): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post(`/tdatos_consultas/insert`, data, config),

    addRecordatorio: (data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post("/t_recordatorios/insert", data, config),

    getRecordatorios: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/t_recordatorios/findRecordatorioByPacienteId`, { params: { id } }),

    updatePaciente: (id: number, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post(`/users/updatePaciente`, data, { params: { id }, ...config }),
  },

  pacienteApi: {},

  view: `${baseURL}/view/`,
  pdf: `${baseURL}/files/`,
};