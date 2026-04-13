"use client";

import { useEffect, useMemo, useState } from "react";

import { InteractivePanel } from "@/components/interactive-panel";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { contacts, projects, skills } from "@/data/portfolio";

type Language = "es" | "en";

const storageKey = "portfolio-language";

const labels = {
  es: {
    headerLanguage: "Idioma",
    nav: [
      { href: "#about", label: "Sobre mí" },
      { href: "#skills", label: "Habilidades" },
      { href: "#projects", label: "Proyectos" },
      { href: "#experience", label: "Experiencia" },
      { href: "#contact", label: "Contacto" },
    ],
    hero: {
      title: "Sleider",
      subtitle: "Full-Stack Software Engineer · Scalable Digital Products",
      description:
        "Desarrollo aplicaciones web production-ready, APIs escalables y sistemas digitales de alto impacto con React, Node.js y TypeScript, aplicando arquitectura modular y optimización de rendimiento para entornos reales de negocio.",
      viewProjects: "Ver proyectos",
      contact: "Contacto",
      location: "Ubicación",
      education: "Educación",
      languages: "Idiomas",
      locationValue: "Costa Rica",
      educationValue: "Bachillerato en Ingeniería en Sistemas",
      languagesValue: "Español nativo · Inglés C1",
    },
    about: {
      title: "Sobre mí",
      paragraphs: [
        "Ingeniero Full-Stack con experiencia construyendo aplicaciones end-to-end, escalables y orientadas a producción. Especializado en React, Node.js y TypeScript, con bases sólidas en Java y Python. He diseñado soluciones para operaciones logísticas reales, incluyendo un sistema interno de pesaje que mejoró la trazabilidad, redujo errores manuales en ~40% y disminuyó tiempos operativos en ~30%.",
        "Me interesa la inteligencia artificial, el desarrollo asistido por IA, la arquitectura de software y cloud computing con AWS. Trabajo con mentalidad analítica, proactiva y orientada a resultados.",
      ],
      chips: [
        "🎓 Bachillerato en Ingeniería en Sistemas",
        "🌎 Español nativo · Inglés C1 (profesional)",
      ],
    },
    skills: {
      title: "Habilidades técnicas",
      description:
        "Stack orientado a productos web modernos, APIs escalables e integración con infraestructura cloud.",
      categories: {
        Lenguajes: "Lenguajes",
        Frontend: "Frontend",
        Backend: "Backend",
        "Bases de datos": "Bases de datos",
        "Cloud / DevOps": "Cloud / DevOps",
        "Herramientas de desarrollo": "Herramientas de desarrollo",
      },
      items: {
        "Responsive UI": "Responsive UI",
        "State management (Zustand)": "Gestión de estado (Zustand)",
        "REST API development": "Desarrollo de APIs REST",
        "JWT authentication": "Autenticación con JWT",
        "bcrypt security": "Seguridad con bcrypt",
        "API integrations": "Integraciones de APIs",
        "Database schema design": "Diseño de esquemas de bases de datos",
        "SQL optimization": "Optimización SQL",
        "Docker (fundamentals)": "Docker (fundamentos)",
        "CI/CD concepts": "Conceptos de CI/CD",
      },
    },
    projects: {
      title: "Proyectos principales",
      description:
        "Proyectos enfocados en experiencia de usuario, arquitectura modular y soluciones funcionales con enfoque real de negocio.",
      buttons: {
        demo: "Live Demo",
        github: "GitHub",
        architecture: "Arquitectura",
        placeholder: "Agrega la URL real para habilitar este botón",
      },
      entries: [
        {
          name: "Sleider Universe – Full Stack E-Commerce Platform",
          description:
            "Plataforma e-commerce full-stack, escalable y production-ready construida con arquitectura modular. Integra autenticación segura con JWT, gestión de productos por roles, carrito y flujo completo de órdenes, con frontend optimizado y backend API robusto desplegado en entorno cloud.",
          highlights: [
            "Autenticación segura con JWT y bcryptjs",
            "Sistema de carrito y órdenes funcional",
            "Base de datos PostgreSQL con Prisma ORM",
            "API REST con Express y TypeScript",
            "Frontend optimizado con Vite + React 18",
            "Interfaz responsiva con TailwindCSS",
          ],
        },
        {
          name: "Coin Toss Interactive Web App",
          description:
            "Aplicación interactiva que simula el lanzamiento de una moneda con animaciones, lógica de probabilidad y arquitectura modular basada en clases JavaScript.",
          highlights: [
            "Animaciones de lanzamiento dinámicas",
            "Lógica de probabilidad controlada",
            "Arquitectura orientada a objetos",
          ],
        },
        {
          name: "QR Code Generator",
          description:
            "Aplicación web que genera códigos QR a partir de cualquier URL. Incluye descarga de imagen PNG, copiar enlace al portapapeles, controles de reinicio y diseño responsivo.",
          highlights: [
            "Generación de QR en tiempo real",
            "Descarga de imagen PNG",
            "Copiar enlace al portapapeles",
            "Diseño responsive",
          ],
        },
      ],
    },
    experience: {
      title: "Experiencia profesional",
      company: "China Harbour Engineering Company · Costa Rica",
      role: "Administrative Assistant & Internal Solutions Developer",
      paragraphs: [
        "Coordinación de operaciones logísticas relacionadas con maquinaria pesada, negociación de precios, verificación de servicios y gestión con proveedores y empresas asociadas.",
        "Diseñé e implementé un sistema digital interno de pesaje para registrar peso, tipo de material, equipo utilizado, origen, destino, fecha y hora en tiempo real. La solución fortaleció la trazabilidad y el control operativo, redujo errores de registro en ~40% y contribuyó a reducir costos y tiempos del proceso en ~30%.",
      ],
      certifications: "Certificaciones y cursos",
      certificationItems: [
        "Cisco Networking Academy · Ethical Hacker",
        "Cisco Networking Academy · Introduction to Cybersecurity",
      ],
    },
    contact: {
      title: "Contacto",
      description:
        "Disponible para oportunidades Full-Stack en equipos internacionales, enfocado en construir sistemas escalables, production-ready y con impacto medible en negocio desde el primer día.",
    },
    footer: "Full-Stack Software Engineer",
    modal: {
      title: "Elige el idioma de tu experiencia",
      description:
        "Puedes ver el mismo portafolio en Español o English. También podrás cambiarlo después desde el header.",
      spanish: "Continuar en Español",
      english: "Continue in English",
    },
  },
  en: {
    headerLanguage: "Language",
    nav: [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#contact", label: "Contact" },
    ],
    hero: {
      title: "Sleider",
      subtitle: "Full-Stack Software Engineer · Scalable Digital Products",
      description:
        "I build production-ready web applications, scalable APIs, and high-impact digital systems with React, Node.js, and TypeScript, using modular architecture and performance optimization for real-world business environments.",
      viewProjects: "View projects",
      contact: "Contact",
      location: "Location",
      education: "Education",
      languages: "Languages",
      locationValue: "Costa Rica",
      educationValue: "Bachelor's Degree in Systems Engineering",
      languagesValue: "Native Spanish · English C1",
    },
    about: {
      title: "About me",
      paragraphs: [
        "Full-Stack Engineer experienced in building scalable, end-to-end, production-grade applications. Specialized in React, Node.js, and TypeScript, with solid foundations in Java and Python. I have designed software solutions for real logistics operations, including an internal digital weighing system that improved traceability, reduced manual errors by ~40%, and shortened operational processing time by ~30%.",
        "I am interested in artificial intelligence, AI-assisted development, software architecture, and cloud computing with AWS. I work with an analytical, proactive, and results-driven mindset.",
      ],
      chips: [
        "🎓 Bachelor's Degree in Systems Engineering",
        "🌎 Native Spanish · English C1 (professional)",
      ],
    },
    skills: {
      title: "Technical skills",
      description:
        "Stack focused on modern web products, scalable APIs, and cloud infrastructure integration.",
      categories: {
        Lenguajes: "Languages",
        Frontend: "Frontend",
        Backend: "Backend",
        "Bases de datos": "Databases",
        "Cloud / DevOps": "Cloud / DevOps",
        "Herramientas de desarrollo": "Development tools",
      },
      items: {
        "Responsive UI": "Responsive UI",
        "State management (Zustand)": "State management (Zustand)",
        "REST API development": "REST API development",
        "JWT authentication": "JWT authentication",
        "bcrypt security": "bcrypt security",
        "API integrations": "API integrations",
        "Database schema design": "Database schema design",
        "SQL optimization": "SQL optimization",
        "Docker (fundamentals)": "Docker (fundamentals)",
        "CI/CD concepts": "CI/CD concepts",
      },
    },
    projects: {
      title: "Featured projects",
      description:
        "Projects focused on user experience, modular architecture, and functional solutions with real business value.",
      buttons: {
        demo: "Live Demo",
        github: "GitHub",
        architecture: "Architecture",
        placeholder: "Add the real URL to enable this button",
      },
      entries: [
        {
          name: "Sleider Universe – Full Stack E-Commerce Platform",
          description:
            "Production-ready full-stack e-commerce platform built with modular architecture. It includes secure JWT authentication, role-based product management, shopping cart and full order lifecycle, with an optimized frontend and robust API backend deployed in cloud infrastructure.",
          highlights: [
            "Secure authentication with JWT and bcryptjs",
            "Functional cart and order workflow",
            "PostgreSQL database with Prisma ORM",
            "REST API built with Express and TypeScript",
            "Optimized frontend with Vite + React 18",
            "Responsive interface built with TailwindCSS",
          ],
        },
        {
          name: "Coin Toss Interactive Web App",
          description:
            "Interactive application that simulates a coin toss with animations, probability logic, and a modular class-based JavaScript architecture.",
          highlights: [
            "Dynamic toss animations",
            "Controlled probability logic",
            "Object-oriented architecture",
          ],
        },
        {
          name: "QR Code Generator",
          description:
            "Web application that generates QR codes from any URL. Includes PNG image download, clipboard copy support, reset controls, and responsive design.",
          highlights: [
            "Real-time QR generation",
            "PNG image download",
            "Copy link to clipboard",
            "Responsive design",
          ],
        },
      ],
    },
    experience: {
      title: "Professional experience",
      company: "China Harbour Engineering Company · Costa Rica",
      role: "Administrative Assistant & Internal Solutions Developer",
      paragraphs: [
        "Coordinated logistics operations related to heavy machinery, price negotiation, service verification, and management with suppliers and partner companies.",
        "Designed and implemented an internal digital weighing system to register weight, material type, equipment used, origin, destination, date, and time in real time. The solution strengthened traceability and operational control, reduced manual registration errors by ~40%, and helped cut process time and operational costs by ~30%.",
      ],
      certifications: "Certifications and courses",
      certificationItems: [
        "Cisco Networking Academy · Ethical Hacker",
        "Cisco Networking Academy · Introduction to Cybersecurity",
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Open to international Full-Stack opportunities focused on scalable, production-ready systems and measurable business impact from day one.",
    },
    footer: "Full-Stack Software Engineer",
    modal: {
      title: "Choose your portfolio language",
      description:
        "You can view the same portfolio in Spanish or English. You can also change it later from the header.",
      spanish: "Continuar en Español",
      english: "Continue in English",
    },
  },
} as const;

function translateSkillItem(language: Language, item: string) {
  return labels[language].skills.items[item as keyof typeof labels.es.skills.items] ?? item;
}

export function PortfolioShell() {
  const [language, setLanguage] = useState<Language>("es");
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "es" || saved === "en") {
      setLanguage(saved);
      setHasSelectedLanguage(true);
      document.documentElement.lang = saved;
      return;
    }

    document.documentElement.lang = "es";
  }, []);

  const selectLanguage = (value: Language) => {
    setLanguage(value);
    setHasSelectedLanguage(true);
    window.localStorage.setItem(storageKey, value);
    document.documentElement.lang = value;
  };

  const content = labels[language];

  const localizedProjects = useMemo(
    () =>
      projects.map((project, index) => ({
        ...project,
        name: content.projects.entries[index]?.name ?? project.name,
        description: content.projects.entries[index]?.description ?? project.description,
        highlights: content.projects.entries[index]?.highlights ?? project.highlights,
      })),
    [content.projects.entries],
  );

  return (
    <div className="min-h-screen text-slate-100">
      {!hasSelectedLanguage ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-3xl border border-cyan-300/25 bg-slate-950/85 p-8 shadow-[0_0_60px_rgba(34,211,238,0.18)]">
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Portfolio Language</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{labels.es.modal.title}</h2>
            <p className="mt-4 text-slate-300">{labels.es.modal.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => selectLanguage("es")}
                className="rounded-2xl bg-cyan-400 px-5 py-4 text-left text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {labels.es.modal.spanish}
              </button>
              <button
                type="button"
                onClick={() => selectLanguage("en")}
                className="rounded-2xl border border-white/20 px-5 py-4 text-left text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                {labels.en.modal.english}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#home" className="text-sm font-semibold tracking-[0.18em] text-cyan-300">
            SLEIDER
          </a>
          <div className="flex items-center gap-4">
            <ul className="hidden gap-6 text-sm text-slate-300 md:flex">
              {content.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-cyan-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/50 p-1 text-xs text-slate-300">
              <span className="px-2 text-[11px] uppercase tracking-[0.14em] text-slate-400">{content.headerLanguage}</span>
              <button
                type="button"
                onClick={() => selectLanguage("es")}
                className={`rounded-full px-3 py-1 transition ${language === "es" ? "bg-cyan-400 text-slate-950" : "hover:text-cyan-300"}`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => selectLanguage("en")}
                className={`rounded-full px-3 py-1 transition ${language === "en" ? "bg-cyan-400 text-slate-950" : "hover:text-cyan-300"}`}
              >
                EN
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main id="home" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14 md:py-20">
        <InteractivePanel className="animate-fade-up rounded-3xl border border-cyan-400/35 bg-slate-900/35 p-8 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-md md:p-12">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-cyan-300">Sleider García · Costa Rica</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">{content.hero.title}</h1>
          <h2 className="mt-2 text-xl font-medium text-slate-200 md:text-2xl">{content.hero.subtitle}</h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">{content.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              {content.hero.viewProjects}
            </a>
            <a href={contacts.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300">
              GitHub
            </a>
            <a href="#contact" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300">
              {content.hero.contact}
            </a>
          </div>
          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm text-slate-300 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{content.hero.location}</p>
              <p className="mt-2">{content.hero.locationValue}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{content.hero.education}</p>
              <p className="mt-2">{content.hero.educationValue}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{content.hero.languages}</p>
              <p className="mt-2">{content.hero.languagesValue}</p>
            </div>
          </div>
        </InteractivePanel>

        <InteractivePanel id="about" className="animate-fade-up rounded-3xl border border-white/20 bg-slate-900/30 p-8 backdrop-blur-md md:p-10">
          <SectionTitle title={content.about.title} />
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
          <div className="mt-6 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
            {content.about.chips.map((chip) => (
              <p key={chip} className="rounded-xl border border-white/15 bg-slate-950/35 px-4 py-3 backdrop-blur-sm">
                {chip}
              </p>
            ))}
          </div>
        </InteractivePanel>

        <InteractivePanel id="skills" className="animate-fade-up rounded-3xl border border-white/20 bg-slate-900/30 p-8 backdrop-blur-md md:p-10">
          <SectionTitle title={content.skills.title} description={content.skills.description} />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {Object.entries(skills).map(([category, items]) => (
              <article key={category} className="rounded-2xl border border-white/15 bg-slate-950/35 p-5 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-cyan-300">
                  {content.skills.categories[category as keyof typeof content.skills.categories] ?? category}
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className="rounded-full border border-white/20 bg-slate-900/55 px-3 py-1 text-xs text-slate-200">
                      {translateSkillItem(language, item)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </InteractivePanel>

        <InteractivePanel id="projects" className="animate-fade-up rounded-3xl border border-white/20 bg-slate-900/30 p-8 backdrop-blur-md md:p-10">
          <SectionTitle title={content.projects.title} description={content.projects.description} />
          <div className="mt-6 space-y-6">
            {localizedProjects.map((project) => (
              <ProjectCard
                key={project.name}
                {...project}
                labels={{
                  demo: content.projects.buttons.demo,
                  github: content.projects.buttons.github,
                  architecture: content.projects.buttons.architecture,
                  placeholder: content.projects.buttons.placeholder,
                }}
              />
            ))}
          </div>
        </InteractivePanel>

        <InteractivePanel id="experience" className="animate-fade-up rounded-3xl border border-white/20 bg-slate-900/30 p-8 backdrop-blur-md md:p-10">
          <SectionTitle title={content.experience.title} />
          <article className="mt-6 rounded-2xl border border-white/15 bg-slate-950/35 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">{content.experience.company}</p>
            <h4 className="mt-2 text-xl font-semibold text-white">{content.experience.role}</h4>
            {content.experience.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </article>

          <article className="mt-6 rounded-2xl border border-white/15 bg-slate-950/35 p-6 backdrop-blur-sm">
            <h4 className="text-xl font-semibold text-white">{content.experience.certifications}</h4>
            <ul className="mt-4 list-inside list-disc space-y-1 text-slate-300">
              {content.experience.certificationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </InteractivePanel>

        <InteractivePanel id="contact" className="animate-fade-up rounded-3xl border border-white/20 bg-slate-900/30 p-8 backdrop-blur-md md:p-10">
          <SectionTitle title={content.contact.title} description={content.contact.description} />
          <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
            <a href={`mailto:${contacts.email}`} className="rounded-xl border border-white/15 bg-slate-950/35 px-4 py-3 text-slate-200 backdrop-blur-sm transition hover:border-cyan-300 hover:text-cyan-300">
              {contacts.email}
            </a>
            <a href={contacts.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-slate-950/35 px-4 py-3 text-slate-200 backdrop-blur-sm transition hover:border-cyan-300 hover:text-cyan-300">
              GitHub
            </a>
            <a href={contacts.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-slate-950/35 px-4 py-3 text-slate-200 backdrop-blur-sm transition hover:border-cyan-300 hover:text-cyan-300">
              LinkedIn
            </a>
          </div>
        </InteractivePanel>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Sleider García · {content.footer}
      </footer>
    </div>
  );
}