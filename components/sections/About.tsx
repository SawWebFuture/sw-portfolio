import Image from "next/image";
import { about } from "@/data/about";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about-sec" className="scroll-mt-24 bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-lg">
              <Image
                src={about.images[0].src}
                alt={about.images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={about.images[1].src}
                alt={about.images[1].alt}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={about.images[2].src}
                alt={about.images[2].alt}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-theme">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {about.title}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          <ul className="mt-6 space-y-3">
            {about.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground sm:text-base">
                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-sm bg-theme" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-theme px-5 py-3 text-sm font-semibold text-white transition hover:bg-theme-dark"
            >
              LinkedIn →
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-theme hover:text-theme"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
