export interface UserData {
    id: number;
    nombre: string;
    foto: string;
    correo: string;
    telefono: string;
    direccion: string | null;
    cedula: number;
    descripcion: string | null;
    especialidad: string | null;
    sexo: string;
    alergias: string;
    estatura: number;
    pesoInicial: number;
    peso: number;
    imc: number;
    porcentajeGrasa: number;
    fechaNacimiento: string;
    proximaCita: string;
}