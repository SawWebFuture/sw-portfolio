import type { Metadata } from "next";
import Link from "next/link";
import { aiGames } from "@/data/aiGames";
import { GameCard } from "@/components/ai/GameCard";

export const metadata: Metadata = {
  title: "AI Games Lab",
  description: "A playable lab for agent strategy, negotiation, and local-first AI workflows by Scott Williams.",
};

export default function AiPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <section className="text-center">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">Interactive AI experiments</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">
          AI games people can experience.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/66 md:text-base">
          A small playable lab for agent strategy, negotiation, and startup decisions — built to show how models
          behave inside real systems, not just chat boxes. Same discipline as the client work: agentic
          orchestration, local-first AI, and systems built to hold up under pressure.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/ai/outsmart"
            className="rounded-xl border border-sky-300/30 bg-sky-300/10 px-5 py-3 text-sm font-black text-sky-100 transition hover:-translate-y-0.5 hover:bg-sky-300/16"
          >
            Play Outsmart Arena
          </Link>
          <Link
            href="/ai/games"
            className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-black text-white/84 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
          >
            See All Games
          </Link>
          <Link
            href="/ai/about"
            className="rounded-xl border border-orange-300/22 bg-orange-300/10 px-5 py-3 text-sm font-black text-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-300/14"
          >
            Why This Lab Exists
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">Featured games</h2>
          <Link href="/ai/games" className="text-sm font-bold text-white/60 transition hover:text-white">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="font-display text-xl font-black tracking-[-0.02em] text-white md:text-2xl">Each turn</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/72 md:grid-cols-2">
          <li>• AI agents receive goals and constraints</li>
          <li>• Players negotiate, deceive, or cooperate</li>
          <li>• The arena updates coins, trust, and rank</li>
          <li>• Visitors inspect why decisions happened</li>
        </ul>
      </section>
    </div>
  );
}
