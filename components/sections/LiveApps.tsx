import Image from "next/image";
import { projects, type ProjectLink } from "@/data/projects";

function linkClasses(variant: ProjectLink["variant"] = "dark") {
  if (variant === "apple") return "bg-[#1c1c1e] text-white hover:bg-black";
  if (variant === "play") return "bg-[#34a853] text-white hover:bg-[#2c8e46]";
  return "bg-foreground text-white hover:bg-theme";
}

export function LiveApps() {
  return (
    <section id="live-sec" className="scroll-mt-24 bg-smoke py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-theme">
            {projects.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {projects.title}{" "}
            <span className="font-medium text-theme">{projects.titleAccent}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project) => (
            <article
              key={project.name}
              className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.stack}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center rounded-md px-3 py-2 text-xs font-semibold transition ${linkClasses(link.variant)}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
