export const skills = {
  Lenguajes: [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
  ],
  Frontend: [
    "React",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Responsive UI",
    "State management (Zustand)",
  ],
  Backend: [
    "Node.js",
    "Express",
    "REST API development",
    "JWT authentication",
    "bcrypt security",
    "API integrations",
  ],
  "Bases de datos": [
    "PostgreSQL",
    "MySQL",
    "Prisma ORM",
    "Database schema design",
    "SQL optimization",
  ],
  "Cloud / DevOps": [
    "AWS",
    "Docker (fundamentals)",
    "Git",
    "GitHub",
    "CI/CD concepts",
  ],
  "Herramientas de desarrollo": [
    "Visual Studio Code",
    "NetBeans",
    "Postman",
    "MySQL Workbench",
    "XAMPP",
    "Prisma Studio",
  ],
} as const;

export const projects = [
  {
    name: "Sleider Universe – Full Stack E-Commerce Platform",
    technologies: [
      "React 18",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "TailwindCSS",
      "Zustand",
      "Vite",
    ],
    description:
      "Plataforma de tienda online moderna con arquitectura full-stack escalable. Autenticación segura con JWT, carrito de compras funcional, sistema de órdenes, gestión de productos, perfiles de usuario y tema oscuro/claro. Deploy en Vercel (frontend) + Leapcell (backend PostgreSQL).",
    highlights: [
      "Autenticación segura con JWT y bcryptjs",
      "Sistema de carrito y órdenes funcional",
      "Base de datos PostgreSQL con Prisma ORM",
      "API REST con Express y TypeScript",
      "Frontend optimizado con Vite + React 18",
      "Interfaz responsiva con TailwindCSS",
    ],
    links: {
      demo: "https://sleideruniverse.vercel.app",
      github: "https://github.com/plowtty/sleideruniverse",
      architecture: "https://github.com/plowtty/sleideruniverse#arquitectura",
    },
  },
  {
    name: "Coin Toss Interactive Web App",
    technologies: ["HTML", "CSS", "JavaScript"],
    description:
      "Aplicación interactiva que simula el lanzamiento de una moneda con animaciones, lógica de probabilidad y arquitectura modular basada en clases JavaScript.",
    highlights: [
      "Animaciones de lanzamiento dinámicas",
      "Lógica de probabilidad controlada",
      "Arquitectura orientada a objetos",
    ],
    links: {
      demo: "https://plowtty.github.io/Flip_the_coin/",
      github: "https://github.com/plowtty/Flip_the_coin",
      architecture: "https://github.com/plowtty/Flip_the_coin/blob/master/Readme.txt",
    },
  },
  {
    name: "QR Code Generator",
    technologies: ["HTML", "CSS", "JavaScript", "qrcode.js"],
    description:
      "Aplicación web que genera códigos QR a partir de cualquier URL. Incluye descarga de imagen PNG, copiar enlace al portapapeles, controles de reinicio y diseño responsivo.",
    highlights: [
      "Generación de QR en tiempo real",
      "Descarga de imagen PNG",
      "Copiar enlace al portapapeles",
      "Diseño responsive",
    ],
    links: {
      demo: "https://plowtty.github.io/QR_generator/",
      github: "https://github.com/plowtty/QR_generator",
      architecture: "https://github.com/plowtty/QR_generator/blob/master/readme.txt",
    },
  },
] as const;

export const contacts = {
  email: "sleiderdev@gmail.com",
  github: "https://github.com/plowtty",
  linkedin: "https://linkedin.com/in/sleider-garcia",
} as const;

export const navLinks = [
  { href: "#about", label: "Sobre mí" },
  { href: "#skills", label: "Habilidades" },
  { href: "#projects", label: "Proyectos" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
] as const;
