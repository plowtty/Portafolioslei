type ProjectCardProps = {
  name: string;
  description: string;
  technologies: readonly string[];
  highlights: readonly string[];
  labels?: {
    demo: string;
    github: string;
    architecture: string;
    placeholder: string;
  };
  links: {
    demo: string;
    github: string;
    architecture: string;
  };
};

const isPlaceholderLink = (value: string) => value === "#";

export function ProjectCard({
  name,
  description,
  technologies,
  highlights,
  labels,
  links,
}: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-white/15 bg-slate-950/35 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/45 hover:shadow-[0_0_30px_rgba(34,211,238,0.16)]">
      <h4 className="text-xl font-semibold text-white">{name}</h4>
      <p className="mt-3 leading-relaxed text-slate-300">{description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
          >
            {tech}
          </li>
        ))}
      </ul>
      <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-300">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3">
        <ProjectLink href={links.demo} label={labels?.demo ?? "Live Demo"} placeholderTitle={labels?.placeholder} primary />
        <ProjectLink href={links.github} label={labels?.github ?? "GitHub"} placeholderTitle={labels?.placeholder} />
        <ProjectLink href={links.architecture} label={labels?.architecture ?? "Architecture"} placeholderTitle={labels?.placeholder} />
      </div>
    </article>
  );
}

type ProjectLinkProps = {
  href: string;
  label: string;
  placeholderTitle?: string;
  primary?: boolean;
};

function ProjectLink({ href, label, placeholderTitle, primary = false }: ProjectLinkProps) {
  const baseClassName = primary
    ? "rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
    : "rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300";

  if (isPlaceholderLink(href)) {
    return (
      <span
        aria-disabled="true"
        title={placeholderTitle ?? "Agrega la URL real para habilitar este botón"}
        className={`${baseClassName} cursor-not-allowed opacity-60`}
      >
        {label}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={baseClassName}>
      {label}
    </a>
  );
}
