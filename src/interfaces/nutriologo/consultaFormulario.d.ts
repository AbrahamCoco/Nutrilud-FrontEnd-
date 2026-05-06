export interface ConsultaFormulario {
  id?: number;
  nutriologo_id: number;
  paciente_id: number;
  peso: number;
  estatura: number;
  circunferencia_cintura: number;
  circunferencia_cadera: number;
  circunferencia_brazo: number;
  pliegue_bicipital: number;
  pliegue_tricipital: number;
  glucosa: number;
  colesterol: number;
  trigliceridos: number;
  presion_arterial: string;
  fecha_medicion: Date;
  siguiente_consulta: Date;
  imc?: float;
  porcentaje_grasa?: float;
  porcentaje_musculo?: float;
}
