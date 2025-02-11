import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class NutriologoController {
  static async getAgenda(id_nutriologo) {
    try {
      const response = await Tarjet.nutriologoApi.getAgenda(id_nutriologo);
      const agenda = response.data.data;

      if (!agenda.length) {
        Utils.swalInfo("No hay eventos en la agenda");
        return null;
      }

      const eventos = agenda.map((evento) => {
        const fechaInicio = new Date(evento.siguiente_consulta);
        const fechaFin = new Date(fechaInicio.getTime() + 29 * 60000);

        return {
          title: `Cita con el paciente: ${evento.tusuario_paciente.nombre} ${evento.tusuario_paciente.primer_apellido} ${evento.tusuario_paciente.segundo_apellido}`,
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
