export interface ConsultaFormulario {
  nutriologo_id: number | null;
  paciente_id: number | null;
  peso: number | null;
  estatura: number | null;
  circunferencia_cintura: number | null;
  circunferencia_cadera: number | null;
  circunferencia_brazo: number | null;
  pliegue_bicipital: number | null;
  pliegue_tricipital: number | null;
  glucosa: number | null;
  colesterol: number | null;
  trigliceridos: number | null;
  presion_arterial: string | null;
  fecha_medicion: string | null;
  siguiente_consulta: string | null;
}
