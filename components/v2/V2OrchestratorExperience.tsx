"use client";

import Link from "next/link";
import { useMemo, useState, useCallback } from "react";
import { v2Agents, type AgentId } from "@/data/v2/agents";
import { v2Businesses, type BusinessId, type MaturityState } from "@/data/v2/businesses";
import { findIntervention } from "@/data/v2/interventions";
import { BusinessConstellationScene } from "./BusinessConstellationScene";

const stateRank: Record<MaturityState, number> = {
  Noisy: 1,
  Coherent: 2,
  Durable: 3,
  Scalable: 4,
  "IPO-ready": 5,
};

function stateBadgeClass(state: MaturityState) {
  if (state === "Noisy") return "bg-orange-100 text-orange-700";
  if (state === "Coherent") return "bg-cyan-100 text-theme";
  if (state === "Durable") return "bg-emerald-100 text-emerald-700";
  if (state === "Scalable") return "bg-blue-100 text-blue-700";
  return "bg-foreground text-white";
}

function agentAccentClass(agentId: AgentId, active = false) {
  const base = "transition-all duration-300";
  if (agentId === "architecture") return `${base} ${active ? "bg-theme text-white shadow-lg shadow-theme/20" : "bg-white text-foreground hover:bg-theme/8"}`;
  if (agentId === "product") return `${base} ${active ? "bg-accent text-white shadow-lg shadow-accent/20" : "bg-white text-foreground hover:bg-accent/10"}`;
  return `${base} ${active ? "bg-[#13b8cf] text-white shadow-lg shadow-cyan-500/20" : "bg-white text-foreground hover:bg-cyan-50"}`;
}

export function V2OrchestratorExperience() {
  const [selectedBusinessId, setSelectedBusinessId] = useState<BusinessId>("ai-startup");
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>("architecture");
  const [completed, setCompleted] = useState<Partial<Record<BusinessId, AgentId>>>({});
  const [eventLog, setEventLog] = useState("Three businesses are running in parallel. Choose where to intervene first.");

  const selectedBusiness = v2Businesses.find((business) => business.id === selectedBusinessId) ?? v2Businesses[0];
  const selectedAgent = v2Agents.find((agent) => agent.id === selectedAgentId) ?? v2Agents[0];
  const activeIntervention = findIntervention(selectedBusiness.id, selectedAgent.id);
  const completedAgentId = completed[selectedBusiness.id];
  const completedIntervention = completedAgentId ? findIntervention(selectedBusiness.id, completedAgentId) : undefined;

  const portfolioState = useMemo<MaturityState>(() => {
    const completedCount = Object.keys(completed).length;
    if (completedCount >= 3) return "Scalable";
    if (completedCount === 2) return "Durable";
    if (completedCount === 1) return "Coherent";
    return "Noisy";
  }, [completed]);

  const portfolioProgress = (stateRank[portfolioState] / stateRank["IPO-ready"]) * 100;

  const handleSelectBusiness = useCallback((businessId: BusinessId) => {
    setSelectedBusinessId(businessId);
    const business = v2Businesses.find((item) => item.id === businessId);
    const recommendedAgentId = business?.recommendedAgentIds[0];
    if (recommendedAgentId) setSelectedAgentId(recommendedAgentId);
  }, []);

  const assignAgent = () => {
    const intervention = activeIntervention;
    if (!intervention) {
      setEventLog(`${selectedAgent.shortName} is useful, but this business needs a different first intervention.`);
      return;
    }

    setCompleted((current) => ({ ...current, [selectedBusiness.id]: selectedAgent.id }));
    setEventLog(intervention.event);
  };

  const autoOrchestrate = () => {
    const nextAgentId = selectedBusiness.recommendedAgentIds[0];
    setSelectedAgentId(nextAgentId);
    const intervention = findIntervention(selectedBusiness.id, nextAgentId);
    setCompleted((current) => ({ ...current, [selectedBusiness.id]: nextAgentId }));
    setEventLog(intervention?.event ?? "Auto-orchestration found the safest next intervention.");
  };

  return (
    <section className="relative overflow-hidden bg-[#f8fbfb] text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(19,184,207,0.16),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(255,129,57,0.14),transparent_32%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid flex-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-7">
            <Link href="/" className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-theme shadow-sm">
              ← Current Portfolio
            </Link>
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">New portfolio prototype</p>
              <h1 className="font-display text-5xl font-black leading-[0.9] tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                Orchestrate Agentic Businesses
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                A first playable slice of Scott’s v2: multiple businesses run in parallel, you assign specialized agents, and the system moves from noisy complexity toward coherent value.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white/84 p-4 shadow-[0_24px_80px_rgba(20,29,56,0.10)] backdrop-blur sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">Portfolio health</p>
                  <p className="mt-1 text-2xl font-black text-foreground">{portfolioState}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${stateBadgeClass(portfolioState)}`}>{Math.round(portfolioProgress)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-smoke">
                <div className="h-full rounded-full bg-gradient-to-r from-accent via-theme to-[#13b8cf] transition-all duration-700" style={{ width: `${portfolioProgress}%` }} />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{eventLog}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {v2Businesses.map((business) => {
                const isSelected = selectedBusiness.id === business.id;
                const isCompleted = Boolean(completed[business.id]);
                return (
                  <button
                    key={business.id}
                    type="button"
                    onClick={() => handleSelectBusiness(business.id)}
                    className={`rounded-[1.4rem] p-4 text-left shadow-sm transition-all duration-300 ${isSelected ? "bg-foreground text-white shadow-xl shadow-foreground/20" : "bg-white text-foreground hover:-translate-y-1"}`}
                    aria-pressed={isSelected}
                  >
                    <span className={`mb-3 inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] ${isCompleted ? "bg-cyan-100 text-theme" : isSelected ? "bg-white/15 text-white" : "bg-orange-100 text-orange-700"}`}>
                      {isCompleted ? "Improving" : "Needs focus"}
                    </span>
                    <h2 className="font-display text-lg font-black">{business.name}</h2>
                    <p className={`mt-2 text-xs leading-5 ${isSelected ? "text-white/72" : "text-muted"}`}>{business.sector}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative h-[22rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_90px_rgba(11,90,107,0.16)] sm:h-[30rem]">
              <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between rounded-full bg-white/76 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-theme shadow-sm backdrop-blur">
                <span>Business Constellation</span>
                <span>Selective 3D</span>
              </div>
              <BusinessConstellationScene
                businesses={v2Businesses}
                selectedBusinessId={selectedBusiness.id}
                completed={completed}
                onSelectBusiness={handleSelectBusiness}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-[0_24px_80px_rgba(20,29,56,0.10)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Active business</p>
                  <h2 className="mt-2 font-display text-3xl font-black tracking-[-0.04em] text-foreground">{selectedBusiness.name}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{selectedBusiness.startingProblem}</p>
                </div>
                <span className="rounded-full bg-smoke px-3 py-1 text-xs font-black text-theme">{selectedBusiness.sector}</span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {v2Agents.map((agent) => {
                  const active = selectedAgent.id === agent.id;
                  const recommended = selectedBusiness.recommendedAgentIds.includes(agent.id);
                  return (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={`rounded-2xl p-4 text-left shadow-sm ${agentAccentClass(agent.id, active)}`}
                      aria-pressed={active}
                    >
                      <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] opacity-70">{recommended ? "Recommended" : "Available"}</span>
                      <h3 className="mt-2 font-display text-base font-black">{agent.shortName}</h3>
                      <p className="mt-2 text-xs leading-5 opacity-75">{agent.focus}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-3xl bg-[#f8fbfb] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted">Intervention result</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">
                      {completedIntervention?.outcome ?? activeIntervention?.outcome ?? selectedBusiness.stakes}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={assignAgent} className="rounded-full bg-foreground px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                      Assign Agent
                    </button>
                    <button type="button" onClick={autoOrchestrate} className="rounded-full bg-white px-5 py-3 text-sm font-black text-theme shadow-sm transition hover:-translate-y-0.5">
                      Auto
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {selectedBusiness.metrics.map((metric) => {
                  const improved = Boolean(completed[selectedBusiness.id]);
                  const state = improved ? metric.after : metric.before;
                  return (
                    <div key={metric.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border/70">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-muted">{metric.label}</p>
                      <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${stateBadgeClass(state)}`}>{state}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-foreground p-6 text-white shadow-[0_30px_90px_rgba(20,29,56,0.2)] sm:flex sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/50">Hiring signal</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-[-0.04em]">This is not just a portfolio. It is a systems-thinking demo.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">The full version will add more businesses, puzzles, proof nodes, and carefully chosen 3D moments only where they clarify orchestration.</p>
          </div>
          <Link href="/#contact-sec" className="mt-5 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:mt-0">
            Book an Architecture Review
          </Link>
        </div>
      </div>
    </section>
  );
}
