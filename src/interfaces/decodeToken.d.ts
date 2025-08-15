export interface DecodeToken {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    exp: number;
    id: number;
    id_admin: number;
    id_nutriologo: number;
    id_paciente: number;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    rol_id: number;
    role: string;
  };
  signature: string;
}
