export interface Articulo {

  id: string;
  titulo: string;
  slug: string; // Crucial para SEO (ej: "beneficios-de-la-dieta-mediterranea")
  resumen: string; // Meta description para Google (150-160 caracteres)
  contenidoJson: string; // Estructura JSON pura generada por Novel
  contenidoHtml: string; // HTML pre-renderizado sanitizado para motores de búsqueda
  imagenPortadaUrl: string; // Imagen principal del artículo (1200x630px para Open Graph)
  categoria: string; // Ej: "Nutrición Clínica", "Deportiva", "Pérdida de Peso"
  etiquetas: string[]; // ["carbohidratos", "salud", "dieta"]
  tiempoLecturaMin: number; // Ej: 5
  estado: "BORRADOR" | "PUBLICADO";
  fechaPublicacion: string; // ISO String: "2026-10-17T00:00:00Z"

  // Información del Nutriólogo Autor
  autor: {
    id: string;
    nombreCompleto: string;
    cedulaProfesional: string;
    fotoUrl: string;
    especialidad: string;
    biografiaCorta: string;
    agendaUrl: string; // Enlace directo para agendar consulta en Nutrilud
  };

}