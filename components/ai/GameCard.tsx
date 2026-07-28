import Link from "next/link";
import type { AiGame } from "@/data/aiGames";

const accentMap = {
  blue: "border-sky-400/20 bg-white/[0.03] text-sky-300 hover:border-sky-400/50",
  orange: "border-orange-300/20 bg-white/[0.03] text-orange-300 hover:border-orange-300/50",
  green: "border-emerald-300/20 bg-white/[0.03] text-emerald-300 hover:border-emerald-300/50",
  purple: "border-violet-300/20 bg-white/[0.03] text-violet-300 hover:border-violet-300/50",
} as const;

const statusLabel: Record<AiGame["status"], string> = {
  playable: "Playable",
  prototype: "Prototype",
  concept: "Concept",
};

export function GameCard({ game }: { game: AiGame }) {
  const content = (
    <div className={`h-full rounded-2xl border p-5 transition hover:-translate-y-1 ${accentMap[game.accent]}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em]">
          {statusLabel[game.status]}
        </span>
        {game.href && <span className="text-xs font-bold text-white/50">Open →</span>}
      </div>
      <h3 className="mt-5 font-display text-2xl font-black tracking-[-0.04em] text-white">{game.title}</h3>
      <p className="mt-1 text-sm font-bold text-white/64">{game.subtitle}</p>
      <p className="mt-4 text-sm leading-6 text-white/58">{game.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {game.players.map((player) => (
          <span key={player} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-white/70">
            {player}
          </span>
        ))}
      </div>
    </div>
  );

  if (!game.href) {
    return content;
  }

  return (
    <Link href={game.href} className="block">
      {content}
    </Link>
  );
}
