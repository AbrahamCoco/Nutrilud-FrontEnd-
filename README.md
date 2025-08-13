---

## 🗺️ Roadmap

- [x] Estructura base con Next.js y Tailwind CSS
- [x] Gestión de usuarios por roles (paciente, nutriólogo, administrador)
- [x] Agendamiento de consultas y expedientes
- [x] Publicación de artículos nutricionales
- [x] Estadísticas y reportes
- [ ] Sistema de notificaciones y recordatorios
- [ ] Integración con servicios externos (Google Calendar, WhatsApp)
- [ ] Tema oscuro y personalización avanzada
- [ ] Internacionalización (i18n)
- [ ] Pruebas automatizadas (unitarias y de integración)
- [ ] Documentación técnica completa

---

## ❓ Preguntas Frecuentes (FAQ)

**¿Qué roles existen en la plataforma?**
- Paciente, Nutriólogo y Administrador. Cada uno tiene acceso a funcionalidades específicas.

**¿Cómo puedo contribuir al proyecto?**
- Realiza un fork, crea tu rama y envía un pull request. Consulta la sección de Contribuciones en la documentación.

**¿Qué tecnologías debo conocer para colaborar?**
- Next.js, React, TypeScript y Tailwind CSS. El proyecto está documentado y es fácil de seguir.

**¿El sistema es seguro?**
- Sí, se implementan buenas prácticas de seguridad y manejo de datos sensibles.

**¿Puedo desplegar el proyecto en Vercel?**
- Sí, está optimizado para despliegue en Vercel y otros servicios compatibles con Next.js.

**¿Dónde reporto errores o solicito nuevas funciones?**
- Usa la sección de Issues en GitHub o contacta al autor por email.

<div align="center">
  <img src="public/globe.svg" width="100" alt="Nutrilud Logo" />
  <h1>Nutrilud FrontEnd</h1>
  <p>🌱 <b>Transforma tu salud con nutrición inteligente</b> 🥗</p>
  <br/>
  <img src="https://img.shields.io/github/workflow/status/AbrahamCoco/Nutrilud-FrontEnd-/CI?style=flat-square" alt="build status" />
  <img src="https://img.shields.io/github/issues/AbrahamCoco/Nutrilud-FrontEnd-?style=flat-square" alt="issues" />
  <img src="https://img.shields.io/github/license/AbrahamCoco/Nutrilud-FrontEnd-?style=flat-square" alt="license" />
  <img src="https://img.shields.io/github/languages/top/AbrahamCoco/Nutrilud-FrontEnd-?style=flat-square" alt="main language" />
  <br/>
  <img src="https://img.shields.io/badge/Next.js-15.4.5-000000?logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss" />
</div>

---


## 🎯 Descripción del Proyecto
Nutrilud FrontEnd es una plataforma profesional para la gestión nutricional que ofrece:

- **👨‍⚕️ Gestión integral** de pacientes y nutriólogos
- **📅 Agendamiento inteligente** de consultas
- **📊 Visualización avanzada** de estadísticas de salud
- **📝 Publicación de artículos** nutricionales
- **📱 Experiencia responsiva** optimizada para todos los dispositivos

---

---


## 🛠️ Stack Tecnológico

### Frontend Principal
- **Next.js 15.4.5** — Framework base
- **React 19.1.0** — Componentes UI
- **TypeScript 5** — Tipado estático
- **Tailwind CSS 4** — Estilización

### Librerías Clave
- **Axios 1.11.0** — Peticiones HTTP
- **jsPDF 3.0.1** — Generación de PDFs
- **ESLint 9** — Linting y calidad de código

---

---


## 🗂️ Estructura del Proyecto

```bash
src/
├── [app](src/app/)            # Routing y páginas principales
├── [components](src/components/)     # Componentes UI reutilizables
├── [controllers](src/controllers/)    # Lógica de negocio
├── [interfaces](src/interfaces/)     # Tipos TypeScript
├── [types](src/types/)          # Tipos globales
├── [utils](src/utils/)          # Funciones helper
public/             # Assets estáticos
```

---

---


## ✨ Características UI/UX

### 🎨 Diseño Moderno
- Sistema de diseño basado en Tailwind CSS
- Paleta de colores profesional y accesible
- Tipografía legible y jerárquica

### 📱 Responsive Design
- Adaptable a móvil, tablet y desktop
- Componentes flexibles y reutilizables
- Optimización de touch targets y gestos

### ⚡ Performance
- Carga optimizada y code splitting automático
- Imágenes lazy-loaded y optimizadas

### ♿ Accesibilidad
- ARIA labels completos
- Contraste AA/AAA
- Navegación por teclado y lectores de pantalla

---

---


## 🚀 Guía Rápida

### Requisitos
- Node.js 18 o superior
- npm 9 o superior

### Instalación

Clona el repositorio:
```bash
git clone https://github.com/AbrahamCoco/Nutrilud-FrontEnd-.git
```

Navega al directorio del proyecto:
```bash
cd Nutrilud-FrontEnd-
```

Instala las dependencias:
```bash
npm install
```

### Comandos básicos
- `npm run dev`    — Inicia el servidor de desarrollo
- `npm run build`  — Compila la aplicación para producción
- `npm run start`  — Inicia el servidor en modo producción
- `npm run lint`   — Ejecuta el linter ESLint

---

## 🧭 Ejemplo de flujo de usuario
1. El usuario inicia sesión como paciente, nutriólogo o administrador.
2. Accede a su panel personalizado según el rol.
3. Puede agendar consultas, revisar expedientes, publicar artículos o visualizar estadísticas.
4. La navegación es intuitiva y cada acción está acompañada de feedback visual.

---


## 📚 Documentación
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

---


## 📬 Contacto
¿Tienes dudas, sugerencias o quieres contribuir?
- **Autor:** Abraham Coco
- **Email:** abraham.cocoletzi.z@gmail.com

---


## 📜 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---
<div align="center" style="margin-top: 40px">
  <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px">
    <img src="https://www.svgrepo.com/show/306466/next-dot-js.svg" width="50" />
    <img src="https://www.svgrepo.com/show/327408/logo-vercel.svg" width="50" />
    <img src="https://www.svgrepo.com/show/475654/github-color.svg" width="50" />
  </div> 
  <p style="font-size: 1.1rem; color: #4a5568">
    <strong>¡Contribuciones bienvenidas!</strong> Ayúdanos a mejorar la salud digital 💚
  </p> 
</div>
