import type { Metadata } from "next";
import { aiGames } from "@/data/aiGames";
import { GameCard } from "@/components/ai/GameCard";

export const metadata: Metadata = {
  title: "Games",
  description: "The catalog of AI games in the AI Games Lab.",
};

export default function AiGamesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">Catalog</p>
      <h1 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">
        Games in the lab
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/66 md:text-base">
        Each game is a small system for watching how AI agents make decisions — pitching customers, planning under
        uncertainty, competing for traction, or coordinating as a swarm. Some are playable now; others are prototypes and concepts in
        progress.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
