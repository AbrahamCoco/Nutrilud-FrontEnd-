import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class ConsultaController {
  static async getPacienteId(id) {
    return this.handleRequest(() => Tarjet.nutriologoApi.getPacienteId(id), "Paciente cargado correctamente", "Error al cargar el paciente");
  }

  static async getAllConsultas(id) {
    return this.handleRequest(() => Tarjet.nutriologoApi.getAllConsultas(id), null, "Error al cargar las consultas");
  }

  static async addConsulta(id, data) {
    return this.handleRequest(
      () =>
        Tarjet.nutriologoApi.addConsulta(id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
      "Consulta agregada correctamente",
      "Error al agregar la consulta"
    );
  }

  static async handleRequest(requestFn, successMessage, errorMessage) {
    try {
      const response = await requestFn();
      if (successMessage) Utils.swalSuccess(successMessage);
      return response.data || response;
    } catch (error) {
      if (errorMessage) Utils.swalError(errorMessage);
      return null;
    }
  }

  static porcentajeGrasa(sexo, imc, edad) {
    const base = 1.2 * imc + 0.23 * edad;
    return sexo === "Masculino" ? base - 16.2 : base - 5.4;
  }

  static areaMuscularBrazo(circunBrazo, pliegueTricipital, sexo) {
    const genero = sexo === "Masculino" ? 10 : 6.5;
    return Math.pow(circunBrazo - pliegueTricipital * Math.PI, 2) / (4 * Math.PI) - genero;
  }
}
