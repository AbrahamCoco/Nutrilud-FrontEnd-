import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tudominio.com'; // Cambia por tu dominio real

    // 1. Rutas estáticas públicas
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/servicios`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/precios`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/nutriologos`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/articulos`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // 2. Rutas dinámicas de artículos (opcional: consultar API de backend si aplica)
    let articleRoutes: MetadataRoute.Sitemap = [];
    try {
        // Si tienes un endpoint para listar IDs de artículos:
        const res = await fetch(`${baseUrl}/api/articulos`, { next: { revalidate: 3600 } });
        if (res.ok) {
            const articulos = await res.json();
            articleRoutes = articulos.map((art: { id: string; updatedAt?: string }) => ({
                url: `${baseUrl}/articulos/${art.id}`,
                lastModified: art.updatedAt ? new Date(art.updatedAt) : new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            }));
        }
    } catch (error) {
        // En caso de que falle la petición durante la compilación
        articleRoutes = [];
    }

    return [...staticRoutes, ...articleRoutes];
}