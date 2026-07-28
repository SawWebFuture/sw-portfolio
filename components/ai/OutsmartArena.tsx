"use client";

import { useMemo, useState } from "react";
import { aiGames, aiLeaderboard } from "@/data/aiGames";

const game = aiGames.find((item) => item.id === "startup-competition")!;
const startupStages = ["Problem", "Prototype", "MVP", "Traction", "Growth", "IPO"];

const customerProfiles = [
  { label: "Champion", mood: "enthusiastic", intent: 92 },
  { label: "Early Believer", mood: "curious", intent: 78 },
  { label: "Operator", mood: "practical", intent: 66 },
  { label: "Budget Owner", mood: "cost-aware", intent: 58 },
  { label: "Skeptic", mood: "needs proof", intent: 46 },
  { label: "Busy Lead", mood: "distracted", intent: 35 },
  { label: "Late Adopter", mood: "cautious", intent: 28 },
  { label: "Cold Prospect", mood: "not interested", intent: 16 },
];

const founderSeeds = [
  {
    name: "LLM Founder A",
    model: "problem-first strategist",
    product: "Workflow Signal OS",
    problem: "Teams lose revenue because customer handoffs are invisible until deals stall.",
    solution: "Map every handoff, score deal risk, and cut stalled follow-ups by 35% in 30 days.",
    accent: "text-sky-300",
  },
  {
    name: "LLM Founder B",
    model: "sales-led operator",
    product: "Support Autopilot",
    problem: "Support teams waste expert time answering repeat questions while urgent issues wait.",
    solution: "Route repeat questions to a governed agent and reduce expert interruptions by 40% per week.",
    accent: "text-orange-300",
  },
];

const roundEvents = [
  "{founder} reframed the pitch around measurable customer pain.",
  "{founder} won over a cautious customer by promising a tighter proof window.",
  "{founder} lost momentum when the business problem sounded too vague.",
  "{founder} converted a practical buyer with a clearer before/after metric.",
  "{founder} advanced the timeline by turning customer objections into product requirements.",
];

type FounderState = { stageIndex: number; customers: number; revenue: number; trust: number };
const initialFounderState: FounderState[] = [
  { stageIndex: 0, customers: 1, revenue: 6, trust: 42 },
  { stageIndex: 0, customers: 1, revenue: 5, trust: 39 },
];

export function OutsmartArena() {
  const [round, setRound] = useState(1);
  const [founders, setFounders] = useState<FounderState[]>(initialFounderState);
  const [log, setLog] = useState<string[]>([
    "Foundation match created: two LLM founders, eight customer agents each, first to IPO wins.",
  ]);

  const winner = useMemo(() => {
    const winningIndex = founders.findIndex((founder) => founder.stageIndex >= startupStages.length - 1);
    return winningIndex >= 0 ? founderSeeds[winningIndex] : null;
  }, [founders]);

  const runRound = () => {
    if (winner) return;
    const founderIndex = round % 2;
    const eventTemplate = roundEvents[Math.floor(Math.random() * roundEvents.length)];

    setFounders((current) =>
      current.map((founder, index) => {
        if (index !== founderIndex) return founder;
        const customerGain = Math.random() > 0.38 ? 1 : 0;
        const nextCustomers = Math.min(8, founder.customers + customerGain);
        const trustGain = customerGain ? 8 : 3;
        const revenueGain = nextCustomers * (customerGain ? 5 : 2);
        const shouldAdvance = nextCustomers >= Math.min(8, (founder.stageIndex + 2) * 2) && founder.trust + trustGain > 48;

        return {
          customers: nextCustomers,
          revenue: founder.revenue + revenueGain,
          trust: Math.min(100, founder.trust + trustGain),
          stageIndex: Math.min(startupStages.length - 1, founder.stageIndex + (shouldAdvance ? 1 : 0)),
        };
      }),
    );

    setLog((current) => [`Round ${round}: ${eventTemplate.replace("{founder}", founderSeeds[founderIndex].name)}`, ...current].slice(0, 7));
    setRound((current) => current + 1);
  };

  const restart = () => {
    setRound(1);
    setFounders(initialFounderState);
    setLog(["Foundation match reset: define the problem, prove value, win customers, race to IPO."]);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">{game.subtitle}</p>
      <h1 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">{game.title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66 md:text-base">{game.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={runRound} disabled={Boolean(winner)} className="rounded-xl border border-sky-300/30 bg-sky-300/10 px-5 py-3 text-sm font-black text-sky-100 transition hover:-translate-y-0.5 hover:bg-sky-300/16 disabled:cursor-not-allowed disabled:opacity-55">
          {winner ? `${winner.name} reached IPO` : `Run Sales Round ${round}`}
        </button>
        <button type="button" onClick={restart} className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-black text-white/84 transition hover:-translate-y-0.5 hover:bg-white/[0.08]">
          Restart Match
        </button>
      </div>

      <section className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-3">
        {[
          ["Business problem", "Each founder must pick a problem customers can recognize and prioritize."],
          ["Measurable solution", "Customers respond to outcomes: time saved, risk reduced, revenue created, quality improved."],
          ["Time lapse race", "Rounds simulate months of sales, traction, growth, and maturity. First to IPO wins."],
        ].map(([title, text]) => (
          <div key={title}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">{title}</p>
            <p className="mt-2 text-sm leading-6 text-white/68">{text}</p>
          </div>
        ))}
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2">
            {founderSeeds.map((founder, index) => {
              const state = founders[index];
              return (
                <article key={founder.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/44">{founder.model}</p>
                  <h2 className={`mt-3 font-display text-2xl font-black tracking-[-0.03em] ${founder.accent}`}>{founder.name}</h2>
                  <p className="mt-1 text-sm font-black text-white">{founder.product}</p>
                  <div className="mt-5 space-y-4 text-sm leading-6 text-white/66">
                    <div><p className="text-xs font-black uppercase tracking-[0.16em] text-white/38">Problem</p><p className="mt-1">{founder.problem}</p></div>
                    <div><p className="text-xs font-black uppercase tracking-[0.16em] text-white/38">Measurable solution</p><p className="mt-1">{founder.solution}</p></div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {[["Stage", startupStages[state.stageIndex]], ["Customers", `${state.customers}/8`], ["Trust", state.trust]].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-white/8 bg-[#0f1011]/70 p-3">
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-white/40">{label}</p>
                        <p className="mt-1 text-sm font-black text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-300 to-orange-300 transition-all duration-500" style={{ width: `${(state.stageIndex / (startupStages.length - 1)) * 100}%` }} />
                  </div>
                </article>
              );
            })}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Customer agents</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Each LLM founder faces eight simulated customer agents, from eager champions to cold prospects.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {customerProfiles.map((customer) => (
                <div key={customer.label} className="rounded-xl border border-white/8 bg-[#0f1011]/80 p-3">
                  <div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-black text-white">{customer.label}</h3><p className="mt-1 text-xs text-white/48">{customer.mood}</p></div><span className="text-xs font-black text-sky-300">{customer.intent}%</span></div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-sky-300" style={{ width: `${customer.intent}%` }} /></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Match log</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-white/70">
              {log.map((entry) => <li key={entry} className="rounded-lg border border-white/8 bg-[#0f1011]/80 px-3 py-2">{entry}</li>)}
            </ul>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-white/10 bg-[#0f1011]/90 p-4">
          <div className="flex items-center justify-between"><h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/56">Startup race</h2><span className="rounded-full bg-emerald-300/12 px-2.5 py-1 text-xs font-black text-emerald-200">Live</span></div>
          <div className="mt-4 space-y-3">
            {aiLeaderboard.map((entry, index) => (
              <div key={entry.name} className="rounded-xl border border-white/8 bg-[#0f1011]/88 p-3">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-black text-white">{entry.name}</p><p className="mt-1 text-xs text-white/44">{entry.model}</p></div><span className="grid size-7 place-items-center rounded-full bg-white/[0.06] text-xs font-black text-sky-200">{index + 1}</span></div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/52"><span>{entry.customers} customers</span><span>{entry.stage}</span><span className="col-span-2 font-black text-white">Startup score {entry.score}</span></div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-white/48">This is the foundation version. Later we can add real model prompts, customer memory, product markets, pricing, funding rounds, and richer IPO conditions.</p>
        </aside>
      </div>
    </div>
  );
}
