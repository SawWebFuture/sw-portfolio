"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { aiGames, aiLeaderboard, type AiGame } from "@/data/aiGames";

function accentClasses(accent: AiGame["accent"], active = false) {
  const map = {
    blue: active ? "border-sky-400/70 bg-sky-400/12 text-sky-100" : "border-sky-400/20 bg-white/[0.03] text-sky-300",
    orange: active ? "border-orange-300/70 bg-orange-300/12 text-orange-100" : "border-orange-300/20 bg-white/[0.03] text-orange-300",
    green: active ? "border-emerald-300/70 bg-emerald-300/12 text-emerald-100" : "border-emerald-300/20 bg-white/[0.03] text-emerald-300",
    purple: active ? "border-violet-300/70 bg-violet-300/12 text-violet-100" : "border-violet-300/20 bg-white/[0.03] text-violet-300",
  };
  return map[accent];
}

function statusLabel(status: AiGame["status"]) {
  if (status === "playable") return "Playable";
  if (status === "prototype") return "Prototype";
  return "Concept";
}

export function AiGamesArena() {
  const [selectedGameId, setSelectedGameId] = useState(aiGames[0].id);
  const [turn, setTurn] = useState(1);
  const selectedGame = useMemo(() => aiGames.find((game) => game.id === selectedGameId) ?? aiGames[0], [selectedGameId]);

  const runTurn = () => setTurn((current) => current + 1);
  const restart = () => setTurn(1);

  return (
    <section className="fixed inset-0 z-[100] overflow-hidden bg-[#08090a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(80,170,255,0.18),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(255,129,57,0.13),transparent_28%),radial-gradient(circle_at_52%_84%,rgba(65,255,177,0.12),transparent_30%),linear-gradient(180deg,#111214,#08090a_38%,#050506)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative z-10 flex h-dvh flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between border-b border-white/8 bg-[#1d1d1a]/78 px-5 py-3 backdrop-blur-xl md:px-10">
          <Link href="/" className="flex items-center gap-3 text-sm font-black tracking-tight text-white">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-sky-300 to-orange-300 text-[#090b10] shadow-[0_0_30px_rgba(125,211,252,0.25)]">SW</span>
            <span>Scott Williams</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-bold text-white/78 md:flex">
            <Link href="/new-portfolio" className="transition hover:text-white">Startup Generator</Link>
            <a href="#games" className="transition hover:text-white">Games</a>
            <a href="#arena" className="transition hover:text-white">Arena</a>
            <Link href="/#contact-sec" className="transition hover:text-white">Book Review</Link>
          </nav>
          <button type="button" onClick={restart} className="rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/78 transition hover:bg-white/[0.08]">
            Restart
          </button>
        </header>

        <main className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 md:grid-cols-[18rem_1fr] md:overflow-hidden md:p-6" id="arena">
          <aside className="hidden min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-2xl backdrop-blur-xl md:flex">
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
                    <span className="grid size-7 place-items-center rounded-full bg-white/[0.06] text-xs font-black text-sky-200">{index + 1}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/52">
                    <span>{entry.coins} coins</span>
                    <span className="font-black text-white">{entry.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="grid min-h-0 gap-4 overflow-hidden lg:grid-rows-[auto_1fr]">
            <section className="grid gap-4 rounded-3xl border border-white/10 bg-[#0d0e10]/84 p-5 shadow-[0_26px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:grid-cols-[17rem_1fr_18rem]" id="games">
              <div className="relative min-h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-sky-400/16 via-white/[0.03] to-orange-300/12 p-4">
                <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_30%,rgba(125,211,252,.45),transparent_18%),radial-gradient(circle_at_80%_70%,rgba(251,146,60,.35),transparent_16%)]" />
                <div className="relative flex h-full flex-col justify-end">
                  <span className="text-6xl">🤖</span>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-sky-200">AI Games Lab</p>
                </div>
              </div>

              <div className="text-center lg:py-4">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">Interactive AI experiments</p>
                <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">AI games people can experience.</h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/66 md:text-base">
                  A playable lab for agent strategy, negotiation, startup decisions, and local-first AI workflows — built to show how models behave inside systems, not just chat boxes.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={runTurn} className="rounded-xl border border-sky-300/30 bg-sky-300/10 px-5 py-3 text-sm font-black text-sky-100 transition hover:-translate-y-0.5 hover:bg-sky-300/16">
                    Run Turn {turn}
                  </button>
                  <button type="button" onClick={() => setTurn((current) => current + 5)} className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-black text-white/84 transition hover:-translate-y-0.5 hover:bg-white/[0.08]">
                    Run Game
                  </button>
                  <button type="button" onClick={restart} className="rounded-xl border border-orange-300/22 bg-orange-300/10 px-5 py-3 text-sm font-black text-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-300/14">
                    Restart
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Each turn</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/72">
                  <li>• AI agents receive goals and constraints</li>
                  <li>• Players negotiate, deceive, or cooperate</li>
                  <li>• The arena updates coins, trust, and rank</li>
                  <li>• Visitors inspect why decisions happened</li>
                </ul>
              </div>
            </section>

            <section className="grid min-h-0 gap-4 overflow-hidden lg:grid-cols-[1fr_18rem]">
              <div className="min-h-0 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
                <div className="grid gap-4 sm:grid-cols-3">
                  {aiGames.map((game) => {
                    const active = game.id === selectedGame.id;
                    return (
                      <button
                        key={game.id}
                        type="button"
                        onClick={() => setSelectedGameId(game.id)}
                        className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 ${accentClasses(game.accent, active)}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em]">{statusLabel(game.status)}</span>
                          <span className="text-xl">{active ? "●" : "○"}</span>
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-black tracking-[-0.04em] text-white">{game.title}</h3>
                        <p className="mt-1 text-sm font-bold text-white/64">{game.subtitle}</p>
                        <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/58">{game.description}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-[#0f1011]/90 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">Selected game</p>
                  <h2 className="mt-2 font-display text-3xl font-black tracking-[-0.04em] text-white">{selectedGame.title}</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">Mechanic</p>
                      <p className="mt-2 text-sm leading-6 text-white/68">{selectedGame.mechanic}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">Signal</p>
                      <p className="mt-2 text-sm leading-6 text-white/68">{selectedGame.signal}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">Players</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedGame.players.map((player) => (
                          <span key={player} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-white/78">{player}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="hidden min-h-0 rounded-3xl border border-white/10 bg-[#0f1011]/90 p-4 backdrop-blur-xl lg:block">
                <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Agents</h2>
                <div className="mt-4 space-y-3">
                  {selectedGame.players.map((player, index) => (
                    <div key={player} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                      <h3 className="font-display text-2xl font-black tracking-[-0.03em] text-sky-300">{player}</h3>
                      <p className="mt-2 text-xs font-bold text-white/70">Coins</p>
                      <p className="mt-1 text-3xl font-black text-white">{12 - index}</p>
                      <p className="mt-2 text-xs text-white/42">Turn {turn} strategy pending...</p>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}
