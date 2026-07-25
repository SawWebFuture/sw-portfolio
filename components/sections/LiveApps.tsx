import Image from "next/image";
import { projects, type ProjectLink } from "@/data/projects";

function linkClasses(variant: ProjectLink["variant"] = "dark") {
  if (variant === "apple") return "bg-[#1c1c1e] text-white hover:bg-black";
  if (variant === "play") return "bg-[#34a853] text-white hover:bg-[#2c8e46]";
  return "bg-foreground text-white hover:bg-theme";
}

export function LiveApps() {
  return (
    <section id="live-sec" className="scroll-mt-24 bg-[#f3f8f9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme sm:text-sm">
            {projects.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {projects.title}{" "}
            <span className="font-semibold text-theme">{projects.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {projects.intro}
          </p>
        </div>

        <div className="mt-10 -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {projects.items.map((project, index) => (
            <article
              key={project.name}
              className="group flex min-w-[82vw] snap-center flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_60px_rgba(20,29,56,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(20,29,56,0.13)] sm:min-w-[24rem] lg:min-w-0"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 24rem, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-70" />
                <span className="absolute left-4 top-4 rounded-full bg-white/84 px-3 py-1 text-xs font-bold text-theme shadow-sm backdrop-blur-md">
                  0{index + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 text-left sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {project.stack}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 pt-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition ${linkClasses(link.variant)}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-1 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted lg:hidden">
          Swipe to explore projects
        </p>
      </div>
    </section>
  );
}
