import { SkillsGeometryField } from "@/components/SkillsStarfield";
import { skills } from "@/data/about";

export function Skills() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-theme/20 to-transparent" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme sm:text-sm">
            {skills.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {skills.title}{" "}
            <span className="font-semibold text-theme">{skills.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{skills.text}</p>

          <div className="mt-8 grid gap-4">
            {skills.items.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border/70 bg-white/82 p-4 shadow-[0_18px_50px_rgba(20,29,56,0.07)] backdrop-blur-md"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {item.title}
                  </h3>
                  <span className="rounded-full bg-theme/10 px-3 py-1 text-sm font-bold text-theme">
                    {item.percent}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-smoke">
                  <div
                    className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-theme via-accent to-[#13b8cf]"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-white p-4 shadow-[0_24px_80px_rgba(20,29,56,0.12)] sm:p-5">
          <div className="relative h-72 overflow-hidden rounded-[1.5rem] border border-border/70 bg-[radial-gradient(circle_at_28%_18%,rgba(255,129,57,0.16),transparent_32%),radial-gradient(circle_at_76%_76%,rgba(19,184,207,0.18),transparent_34%),linear-gradient(145deg,#ffffff_0%,#f3f8f9_100%)] sm:h-80 lg:h-96">
            <SkillsGeometryField className="opacity-100" />
            <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between rounded-full border border-border/70 bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur-md">
              <span>Geometry Field</span>
              <span className="text-theme">Live Motion</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Production focus
            </p>
            <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Simple shapes, agentic motion.
            </h3>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-foreground sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-white/80 px-4 py-3 backdrop-blur">
                Agent swarms
              </div>
              <div className="rounded-2xl border border-border/70 bg-white/80 px-4 py-3 backdrop-blur">
                Local-first privacy
              </div>
              <div className="rounded-2xl border border-border/70 bg-white/80 px-4 py-3 backdrop-blur">
                Edge LLMs
              </div>
              <div className="rounded-2xl border border-border/70 bg-white/80 px-4 py-3 backdrop-blur">
                Zero downtime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
