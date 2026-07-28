import type { Metadata } from "next";
import Link from "next/link";
import { about, hero } from "@/data/about";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "About the Lab",
  description: "Why the AI Games Lab exists and how it connects to Scott Williams' real systems work.",
};

export default function AiAboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">{about.eyebrow}</p>
      <h1 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">
        Why this lab exists
      </h1>

      <div className="mt-6 space-y-4 text-sm leading-7 text-white/72 md:text-base">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-6 text-sm leading-7 text-white/72 md:text-base">
        The AI Games Lab is a playable version of that work. Instead of describing{" "}
        <span className="font-bold text-white">{hero.titleLines.join(" · ")}</span>, each game puts agents in a
        small system with real constraints — coins, trust, turns — so you can watch strategy, negotiation, and
        alignment drift happen instead of reading about it.
      </p>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="font-display text-xl font-black tracking-[-0.02em] text-white md:text-2xl">
          What the games are built on
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-white/72">
          {about.checklist.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 text-sky-300">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-black tracking-[-0.02em] text-white md:text-2xl">
          {services.title} <span className="text-sky-300">{services.titleAccent}</span>
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/66">{services.intro}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.items.map((service) => (
            <div key={service.title} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <h3 className="text-sm font-black text-white">{service.title}</h3>
              <p className="mt-2 text-xs leading-6 text-white/58">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-black tracking-[-0.02em] text-white md:text-2xl">
          {projects.title} <span className="text-orange-300">{projects.titleAccent}</span>
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/66">{projects.intro}</p>
        <ul className="mt-6 space-y-3">
          {projects.items.map((project) => (
            <li key={project.name} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-black text-white">{project.name}</h3>
                <span className="text-xs font-bold text-white/44">{project.stack}</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-white/58">{project.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/ai/games"
          className="rounded-xl border border-sky-300/30 bg-sky-300/10 px-5 py-3 text-sm font-black text-sky-100 transition hover:-translate-y-0.5 hover:bg-sky-300/16"
        >
          Explore the games
        </Link>
        <Link
          href="/#contact-sec"
          className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-black text-white/84 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
        >
          Talk to Scott
        </Link>
      </div>
    </div>
  );
}
