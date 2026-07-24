import Image from "next/image";
import { hero } from "@/data/about";
import { site, socialLinks } from "@/data/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#0b5a6b_0%,#0a3f4b_48%,#16303a_100%)] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,129,57,0.22),transparent_42%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <div className="relative h-full w-full">
          <Image
            src={hero.image}
            alt="Scott Williams app development"
            fill
            priority
            className="object-contain object-right-bottom opacity-95"
            sizes="48vw"
          />
        </div>
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {hero.subtitle}
          </p>
          <h1 className="animate-fade-up-delay mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            <span className="block">{hero.titleLines[0]}</span>
            <span className="mt-1 block text-white/90">{hero.titleLines[1]}</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {hero.text}
          </p>

          <div className="animate-fade-up-delay-2 mt-6 grid gap-3 sm:grid-cols-2">
            {hero.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white/85 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                {highlight}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {hero.primaryCta}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#service-sec"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {hero.secondaryCta}
              <span aria-hidden>↓</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm uppercase tracking-wide text-white/70">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:hidden">
          <Image
            src={hero.image}
            alt="Scott Williams app development"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
