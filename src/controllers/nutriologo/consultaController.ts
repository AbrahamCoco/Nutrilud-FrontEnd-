import { ConsultaFormulario } from "@/interfaces/nutriologo/consultaFormulario.d";
import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";
import { AxiosResponse } from "axios";

export class ConsultaController {
  static async getPacienteId(id: number) {
    return this.handleRequest(() => Tarjet.nutriologoApi.getPacienteId(id), "Paciente cargado correctamente.", "Error al cargar el paciente.");
  }

  static async getAllConsultas(id: number) {
    return this.handleRequest(() => Tarjet.nutriologoApi.getAllConsultas(id), "", "Error al cargar las consultas.");
  }

  static async addConsulta(data: ConsultaFormulario) {
    return this.handleRequest(
      () =>
        Tarjet.nutriologoApi.addConsulta(data, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
      "Consulta agregada correctamente.",
      "Error al agregar consulta."
    );
  }

  static async handleRequest<T>(requestFn: () => Promise<AxiosResponse<T>>, successMessage: string, errorMessage: string) {
    try {
      const response = await requestFn();
      if (successMessage) Utils.swalSuccess(successMessage);
      return response.data || response;
    } catch (error) {
      if (errorMessage) Utils.swalError(errorMessage);
      return null;
    }
  }

  static porcentajeGrasa (sexo: string, imc: number, edad: number) {
    const base = 1.2 * imc + 0.23 * edad;
    return sexo === "Maculino" ? base - 16.2 : base - 5.2;
  }

  static areaMuscularBrazo (circunBrazo: number, pliegueTricipital: number, sexo: string) {
    const genero = sexo === "Masculino" ? 10 : 6.5;
    return Math.pow(circunBrazo - pliegueTricipital * Math.PI, 2) / (4 * Math.PI) - genero;
  }
}