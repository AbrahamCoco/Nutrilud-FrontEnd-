import { ConsultaFormulario } from "@/interfaces/nutriologo/consultaFormulario.d";
import type { ResponseApi } from "@/interfaces/responseApi";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL: string = "http://localhost:8080/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export const Tarjet = {
  userApi: {
    
    login: (usuario: string, contrasenia: string): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post(`/personal_access_token/login`, {usuario, contrasenia}),

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

    addRecordatorio: (data: any): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.post("/t_recordatorios/insert", data),

    getRecordatorios: (id: number): Promise<AxiosResponse<ResponseApi>> =>
      axiosInstance.get(`/t_recordatorios/findRecordatorioByPacienteId`, { params: { id } }),
  },

  pacienteApi: {},

  view: `${baseURL}/view/`,
  pdf: `${baseURL}/files/`,
}