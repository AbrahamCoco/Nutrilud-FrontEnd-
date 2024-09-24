import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class ConsultaController {
  static async getPacienteId(id) {
    try {
      const response = await Tarjet.nutriologoApi.getPacienteId(id);
      Utils.swalSuccess("Paciente cargado correctamente");
      return response.data;
    } catch (error) {
      Utils.swalError("Error al cargar el paciente");
      return null;
    }
  }

  static async getAllConsultas(id) {
    try {
      const response = await Tarjet.nutriologoApi.getAllConsultas(id);
      return response;
    } catch (error) {
      Utils.swalError("Error al cargar las consultas");
      return null;
    }
  }

  static async addConsulta(id, data) {
    try {
      const response = await Tarjet.nutriologoApi.addConsulta(id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Utils.swalSuccess("Consulta agregada correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al agregar la consulta");
      return null;
    }
  }

  static async porcentajeGrasa(sexo, imc, edad) {
    let porcentajeGrasa = 0;
    if (sexo === "Masculino") {
      porcentajeGrasa = 1.2 * imc + 0.23 * edad - 16.2;
    } else if (sexo === "Femenino") {
      porcentajeGrasa = 1.2 * imc + 0.23 * edad - 5.4;
    }
    return porcentajeGrasa;
  }

  static async areaMuscularBrazo(circunBrazo, pliegueTricipital, sexo) {
    let genero = 0;
    let areaMuscularBrazo = 0;
    if (sexo === "Masculino") {
      genero = 10;
    } else if (sexo === "Femenino") {
      genero = 6.5;
    }

    areaMuscularBrazo = Math.pow(circunBrazo - pliegueTricipital * Math.PI, 2) / (4 * Math.PI) - genero;
    return areaMuscularBrazo;
  }
}
