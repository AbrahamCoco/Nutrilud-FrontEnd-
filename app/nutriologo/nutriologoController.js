import { Tarjet } from "../utils/axiosConfig";
import { Utils } from "../utils/utils";

export class NutriologoController {
  static async getAgenda() {
    try {
      const response = await Tarjet.nutriologoApi.getAgenda();
      const agenda = response.data.agenda;

      if (!agenda.length) {
        Utils.swalInfo("No hay eventos en la agenda");
        return null;
      }

      const eventos = agenda.map((evento) => {
        const fechaInicio = new Date(evento.siguiente_consulta);
        const fechaFin = new Date(fechaInicio.getTime() + 29 * 60000);

        return {
          title: `Cita con el paciente: ${evento.paciente.user.nombre} ${evento.paciente.user.primer_apellido} ${evento.paciente.user.segundo_apellido}`,
          start: fechaInicio,
          end: fechaFin,
        };
      });

      Utils.swalSuccess("Agenda cargada correctamente");
      return eventos;
    } catch (error) {
      Utils.swalFailure("Error al cargar la agenda: ", error.response.data.message);
      return null;
    }
  }
}
