type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
      ) : null}
      <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
      {description ? <p className="mt-3 max-w-3xl text-slate-300">{description}</p> : null}
    </div>
  );
}
