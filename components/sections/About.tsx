"use client";

import { useState } from "react";
import { AboutAiSystemScene, type AboutAnimationMode } from "@/components/AboutAiSystemScene";
import { about } from "@/data/about";
import { site } from "@/data/site";

export function About() {
  const [animationMode, setAnimationMode] = useState<AboutAnimationMode>("Autonomy");

  return (
    <section
      id="about-sec"
      className="scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef3f4_100%)] py-14 sm:py-18 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="order-1 lg:order-none">
          <div className="relative mx-auto h-[22rem] w-full max-w-md overflow-hidden rounded-[2rem] border border-border/80 bg-[radial-gradient(circle_at_35%_18%,rgba(255,129,57,0.18),transparent_38%),linear-gradient(145deg,#0b5a6b_0%,#102f3a_58%,#141d38_100%)] shadow-[0_28px_90px_rgba(20,29,56,0.22)] sm:h-[26rem] lg:max-w-lg">
            <div className="absolute inset-x-6 top-5 z-10 flex items-center justify-between rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              <span>AI System</span>
              <span className="text-accent">Quality Output</span>
            </div>
            <AboutAiSystemScene className="opacity-95" mode={animationMode} />
            <div className="absolute inset-x-5 bottom-5 z-10 grid grid-cols-3 gap-2">
              {about.outcomes.map((outcome) => {
                const active = animationMode === outcome;

                return (
                  <button
                    key={outcome}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setAnimationMode(outcome)}
                    className={`rounded-2xl border px-3 py-2 text-center text-xs font-semibold backdrop-blur-md transition ${
                      active
                        ? "border-accent/70 bg-accent text-white shadow-[0_0_26px_rgba(255,129,57,0.42)]"
                        : "border-white/10 bg-white/10 text-white/85 hover:border-white/25 hover:bg-white/15"
                    }`}
                  >
                    {outcome}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-2 lg:order-none">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme sm:text-sm">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {about.title}
          </h2>
          <div className="mt-5 space-y-4">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-7 grid gap-3">
            {about.checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border/80 bg-surface px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm sm:text-base"
              >
                <span className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_5px_rgba(255,129,57,0.14)]" />
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
              Let’s Talk Shop →
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-theme hover:text-theme"
            >
              View Systems Work →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
