"use client";

import { useState } from "react";
import { aiGames, aiLeaderboard } from "@/data/aiGames";

const game = aiGames.find((item) => item.id === "outsmart-arena")!;

const events = [
  "{player} proposes a private alliance over shared coins.",
  "{player} bluffs about their remaining reserves.",
  "{player} breaks an alliance to grab the lead.",
  "{player} shares intel to build trust for a later trade.",
  "{player} stalls, waiting to see how others move first.",
];

export function OutsmartArena() {
  const [turn, setTurn] = useState(0);
  const [coins, setCoins] = useState<number[]>(() => game.players.map(() => 12));
  const [log, setLog] = useState<string[]>([]);

  const runTurn = () => {
    const actorIndex = Math.floor(Math.random() * game.players.length);
    const event = events[Math.floor(Math.random() * events.length)].replace("{player}", game.players[actorIndex]);
    const delta = Math.floor(Math.random() * 5) - 2;

    setCoins((current) => current.map((coin, index) => (index === actorIndex ? Math.max(0, coin + delta) : coin)));
    setLog((current) => [event, ...current].slice(0, 6));
    setTurn((current) => current + 1);
  };

  const restart = () => {
    setTurn(0);
    setCoins(game.players.map(() => 12));
    setLog([]);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">{game.subtitle}</p>
      <h1 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">{game.title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/66 md:text-base">{game.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={runTurn}
          className="rounded-xl border border-sky-300/30 bg-sky-300/10 px-5 py-3 text-sm font-black text-sky-100 transition hover:-translate-y-0.5 hover:bg-sky-300/16"
        >
          Run Turn {turn + 1}
        </button>
        <button
          type="button"
          onClick={restart}
          className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-black text-white/84 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
        >
          Restart
        </button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Agents</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {game.players.map((player, index) => (
                <div key={player} className="rounded-xl border border-white/8 bg-[#0f1011]/88 p-4">
                  <h3 className="font-display text-xl font-black tracking-[-0.03em] text-sky-300">{player}</h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">Coins</p>
                  <p className="mt-1 text-3xl font-black text-white">{coins[index]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Turn log</h2>
            {log.length === 0 ? (
              <p className="mt-4 text-sm text-white/44">Run a turn to see agents negotiate.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm leading-6 text-white/70">
                {log.map((entry, index) => (
                  <li key={index} className="rounded-lg border border-white/8 bg-[#0f1011]/80 px-3 py-2">
                    {entry}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">Mechanic</p>
              <p className="mt-2 text-sm leading-6 text-white/68">{game.mechanic}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">Signal</p>
              <p className="mt-2 text-sm leading-6 text-white/68">{game.signal}</p>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-white/10 bg-[#0f1011]/90 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Leaderboard</h2>
            <span className="rounded-full bg-emerald-300/12 px-2.5 py-1 text-xs font-black text-emerald-200">Live</span>
          </div>
          <div className="mt-4 space-y-3">
            {aiLeaderboard.map((entry, index) => (
              <div key={entry.name} className="rounded-xl border border-white/8 bg-[#0f1011]/88 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-white">{entry.name}</p>
                    <p className="mt-1 text-xs text-white/44">{entry.model}</p>
                  </div>
                  <span className="grid size-7 place-items-center rounded-full bg-white/[0.06] text-xs font-black text-sky-200">
                    {index + 1}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-white/52">
                  <span>{entry.coins} coins</span>
                  <span className="font-black text-white">{entry.score}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
