import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Definimos la URL base de tu sitio (cámbiala por tu dominio real en producción)
const BASE_URL = "https://tudominio.com";

export const metadata: Metadata = {
  // 1. Configuración básica de Título y Descripción (con estrategia de palabras clave)
  title: {
    default: "Nutrilud | Salud, Nutrición y Bienestar Personalizado",
    template: "%s | Nutrilud", // Permite que las páginas hijas tengan un sufijo automático
  },
  description: "Descubre Nutrilud, tu plataforma integral de seguimiento de salud y nutrición. Optimiza tus hábitos alimenticios y alcanza tus metas de bienestar.",

  // 2. Palabras clave (Aunque Google les da menos peso hoy en día, otros buscadores aún las leen)
  keywords: ["nutrición", "salud", "bienestar", "dieta personalizada", "seguimiento nutricional", "Nutrilud"],

  // 3. Autor y creador
  authors: [{ name: "Tu Nombre o Empresa", url: BASE_URL }],
  creator: "Nutrilud Team",
  publisher: "Nutrilud",

  // 4. Configuración de Robots (Indexación y Rastreo)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 5. Open Graph (SEO para Redes Sociales: WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "es_MX", // Cambia según tu país (ej. es_ES, es_MX)
    url: BASE_URL,
    title: "Nutrilud | Salud, Nutrición y Bienestar Personalizado",
    description: "Tu plataforma integral de seguimiento de salud y nutrición.",
    siteName: "Nutrilud",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`, // Imagen que se muestra al compartir (1200x630px recomendado)
        width: 1200,
        height: 630,
        alt: "Nutrilud - Salud y Nutrición",
      },
    ],
  },

  // 6. Twitter Cards (SEO para Twitter/X)
  twitter: {
    card: "summary_large_image",
    title: "Nutrilud | Salud, Nutrición y Bienestar Personalizado",
    description: "Tu plataforma integral de seguimiento de salud y nutrición.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@tu_usuario_twitter", // Opcional
  },

  // 7. Canonical URL (Evita contenido duplicado)
  alternates: {
    canonical: BASE_URL,
  },

  // 8. Verificación de herramientas de búsqueda (Opcional pero recomendado)
  verification: {
    google: "AQUÍ_PON_EL_CODIGO_DE_GOOGLE_SEARCH_CONSOLE",
    // yandex: "...",
    // bing: "...",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4 pt-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}