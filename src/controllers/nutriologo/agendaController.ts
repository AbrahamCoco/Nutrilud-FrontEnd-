import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";

export class AgendaController {
  static async getAgenda(id_nutriologo: number) {
    try {
      const response = await Tarjet.nutriologoApi.getAgenda(id_nutriologo);
      const agenda = response.data.data;

      if (!Array.isArray(agenda) || agenda.length === 0) {
        Utils.swalInfo("No hay eventos en la agenda.");
        return null;
      }

      const eventos = agenda.map((evento: any) => {
        const fechaInicio = new Date(evento.siguiente_consulta);
        const fechaFin = new Date(fechaInicio.getTime() + 29 * 60000);

        return {
          id_paciente: evento.id_paciente,
          title: `Cita con el paciente: ${evento.nombre} ${evento.primer_apellido} ${evento.segundo_apellido}`,
          start: fechaInicio,
          end: fechaFin,
        };
      });

      eventos.sort((a: any, b: any) => a.start.getTime() - b.start.getTime());
      return eventos;
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      console.error(errorMessage);
      return null;
    }
  }
}