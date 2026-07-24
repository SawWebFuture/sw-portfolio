import Image from "next/image";
import { skills } from "@/data/about";
import { site } from "@/data/site";

export function Skills() {
  return (
    <section className="bg-smoke py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-theme">
            {skills.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {skills.title}{" "}
            <span className="font-medium text-theme">{skills.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{skills.text}</p>

          <div className="mt-8 space-y-5">
            {skills.items.map((item) => (
              <div key={item.title}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {item.title}
                  </h3>
                  <span className="text-sm font-semibold text-theme">{item.percent}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white">
                  <div
                    className="skill-bar-fill h-full rounded-full bg-theme"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Image
            src={skills.videoImage}
            alt="Development process"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
          <a
            href={site.skillsVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-theme text-xl text-white shadow-lg transition hover:scale-105 hover:bg-theme-dark"
            aria-label="Watch skills video"
          >
            ▶
          </a>
        </div>
      </div>
    </section>
  );
}
