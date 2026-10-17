import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://tudominio.com'; // Cambia por tu dominio real en producción

    return {
        rules: {
            userAgent: '*',
            allow: [
                '/',
                '/servicios',
                '/precios',
                '/contacto',
                '/articulos',
                '/articulos/*',
                '/nutriologos',
            ],
            disallow: [
                '/administrador/',
                '/administrador/*',
                '/nutriologo/',
                '/nutriologo/*',
                '/paciente/',
                '/paciente/*',
                '/perfil/',
                '/perfil/*',
                '/api/',
                '/api/*',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}