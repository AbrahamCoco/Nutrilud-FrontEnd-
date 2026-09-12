export interface AgendaData {
    id_paciente: number;
    siguiente_consulta: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
}

export interface AgendaEvento {
    id_paciente: number;
    title: string;
    start: Date;
    end: Date;
}