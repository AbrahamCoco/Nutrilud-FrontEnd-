import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class AgendaController {
  static async getAgenda() {
    try {
      const response = await Tarjet.nutriologoApi.getAgenda();
      if (response.data.agenda.length === 0) {
        Utils.swalInfo("No hay eventos en la agenda");
        return null;
      }
      const eventos = response.data.agenda.map((evento) => {
        const fechaInicio = new Date(evento.siguiente_consulta);
        const fechaFin = new Date(fechaInicio);
        fechaFin.setMinutes(fechaFin.getMinutes() + 29);

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
