# Sleider García — Portfolio Full-Stack

Portafolio profesional desarrollado con Next.js para mostrar experiencia, stack técnico y proyectos reales con un enfoque moderno de UX/UI.

## 🚀 Demo

- Portfolio: _pendiente de URL final en Vercel_
- Proyecto destacado (Sleider Universe): https://sleideruniverse.vercel.app

## ✨ Características principales

- Diseño visual moderno con fondo interactivo tipo red/universo (canvas).
- Efectos de interfaz avanzados (glassmorphism, micro-parallax, spotlight).
- Selector de idioma (`Español / English`) con persistencia en `localStorage`.
- Secciones de habilidades, proyectos, experiencia y contacto.
- Enlaces a demos y repositorios reales de proyectos.
- Arquitectura modular con componentes reutilizables.

## 🧰 Stack

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS v4

### UI/UX
- HTML5 Canvas API
- Animaciones CSS + efectos de parallax
- Componentes interactivos personalizados

## 📁 Estructura del proyecto

```text
app/
	globals.css
	layout.tsx
	page.tsx
components/
	interactive-panel.tsx
	portfolio-shell.tsx
	project-card.tsx
	section-title.tsx
	universe-background.tsx
	visual-effects-controller.tsx
data/
	portfolio.ts
public/
```

## ⚙️ Instalación y ejecución local

```bash
npm install
npm run dev
```

Abrir en navegador:

```text
http://localhost:3000
```

## 🏗️ Build de producción

```bash
npm run build
npm run start
```

## 🌐 Deploy en Vercel

1. Subir este proyecto a un repositorio en GitHub.
2. Ir a Vercel → **Add New Project**.
3. Importar el repositorio.
4. Confirmar configuración detectada (Next.js).
5. Presionar **Deploy**.

Cada `push` a la rama principal dispara un nuevo despliegue automático.

## 📌 Roadmap corto

- Agregar botón funcional para descarga de CV (`/public/Sleider-Garcia-CV.pdf`).
- Publicar URL final del portafolio en este README.
- Ajustar metadata social (`Open Graph`) con imagen preview.

## 👤 Contacto

- Email: `sleiderdev@gmail.com`
- GitHub: https://github.com/plowtty
- LinkedIn: https://linkedin.com/in/sleider-garcia

---

Desarrollado por **Sleider García**.

---

# Sleider García — Full-Stack Portfolio

Modern professional portfolio built with Next.js to showcase experience, technical stack, and real-world projects with a strong UX/UI focus.

## 🚀 Demo

- Portfolio: _final Vercel URL pending_
- Featured project (Sleider Universe): https://sleideruniverse.vercel.app

## ✨ Main Features

- Modern visual design with an interactive network/universe background (canvas).
- Advanced UI effects (glassmorphism, micro-parallax, spotlight).
- Language selector (`Español / English`) with `localStorage` persistence.
- Sections for skills, projects, experience, and contact.
- Real links to project demos and repositories.
- Modular architecture with reusable components.

## 🧰 Stack

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS v4

### UI/UX
- HTML5 Canvas API
- CSS animations + parallax effects
- Custom interactive components

## 📁 Project Structure

```text
app/
	globals.css
	layout.tsx
	page.tsx
components/
	interactive-panel.tsx
	portfolio-shell.tsx
	project-card.tsx
	section-title.tsx
	universe-background.tsx
	visual-effects-controller.tsx
data/
	portfolio.ts
public/
```

## ⚙️ Local Setup

```bash
npm install
npm run dev
```

Open in browser:

```text
http://localhost:3000
```

## 🏗️ Production Build

```bash
npm run build
npm run start
```

## 🌐 Vercel Deployment

1. Push this project to a GitHub repository.
2. Go to Vercel → **Add New Project**.
3. Import your repository.
4. Confirm the detected Next.js settings.
5. Click **Deploy**.

Every `push` to your main branch triggers an automatic redeploy.

## 📌 Short Roadmap

- Add functional CV download button (`/public/Sleider-Garcia-CV.pdf`).
- Publish final portfolio URL in this README.
- Improve social metadata (`Open Graph`) with preview image.

## 👤 Contact

- Email: `sleiderdev@gmail.com`
- GitHub: https://github.com/plowtty
- LinkedIn: https://linkedin.com/in/sleider-garcia

---

Built by **Sleider García**.
