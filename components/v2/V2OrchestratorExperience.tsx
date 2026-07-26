"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { v2Agents, type AgentId } from "@/data/v2/agents";
import { v2Businesses, type BusinessId, type MaturityState } from "@/data/v2/businesses";
import { findIntervention } from "@/data/v2/interventions";
import { startupStages } from "@/data/v2/stages";
import { BusinessConstellationScene } from "./BusinessConstellationScene";

const stateRank: Record<MaturityState, number> = {
  Noisy: 1,
  Coherent: 2,
  Durable: 3,
  Scalable: 4,
  "IPO-ready": 5,
};

const flowSteps = startupStages.map((stage) => stage.label);
const launchAnimationMs = 1050;

function stateBadgeClass(state: MaturityState) {
  if (state === "Noisy") return "bg-orange-100 text-orange-700";
  if (state === "Coherent") return "bg-cyan-100 text-theme";
  if (state === "Durable") return "bg-emerald-100 text-emerald-700";
  if (state === "Scalable") return "bg-blue-100 text-blue-700";
  return "bg-foreground text-white";
}

function agentAccentClass(agentId: AgentId, active = false) {
  const base = "transition-all duration-300";
  if (agentId === "architecture") return `${base} ${active ? "bg-theme text-white shadow-lg shadow-theme/20" : "bg-white/78 text-foreground hover:bg-theme/8"}`;
  if (agentId === "product") return `${base} ${active ? "bg-accent text-white shadow-lg shadow-accent/20" : "bg-white/78 text-foreground hover:bg-accent/10"}`;
  return `${base} ${active ? "bg-[#13b8cf] text-white shadow-lg shadow-cyan-500/20" : "bg-white/78 text-foreground hover:bg-cyan-50"}`;
}

export function V2OrchestratorExperience() {
  const [launched, setLaunched] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [transitionPulse, setTransitionPulse] = useState(0);
  const [selectedBusinessId, setSelectedBusinessId] = useState<BusinessId>("ai-startup");
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>("architecture");
  const [completed, setCompleted] = useState<Partial<Record<BusinessId, AgentId>>>({});
  const [eventLog, setEventLog] = useState("Select a startup business, then launch the generator.");

  const selectedBusiness = v2Businesses.find((business) => business.id === selectedBusinessId) ?? v2Businesses[0];
  const selectedAgent = v2Agents.find((agent) => agent.id === selectedAgentId) ?? v2Agents[0];
  const currentStage = startupStages[stageIndex] ?? startupStages[0];
  const earnedBadges = startupStages.slice(0, stageIndex + (launched ? 1 : 0));
  const activeIntervention = findIntervention(selectedBusiness.id, selectedAgent.id);

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

  const resetExperience = () => {
    setLaunched(false);
    setLaunching(false);
    setStageIndex(0);
    setTransitionPulse((current) => current + 1);
    setCompleted({});
    setEventLog("Select a startup business, then launch the generator.");
  };

  const launchGenerator = () => {
    setLaunching(true);
    setStageIndex(0);
    setTransitionPulse((current) => current + 1);
    setEventLog("Rocket ignition. Startup system coming online.");

    window.setTimeout(() => {
      setLaunching(false);
      setLaunched(true);
      setEventLog(`${selectedBusiness.name} launched into the Idea stage. The dashboard will guide each transition.`);
    }, launchAnimationMs);
  };

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

  const goToNextStage = () => {
    setStageIndex((current) => {
      const next = Math.min(current + 1, startupStages.length - 1);
      const stage = startupStages[next] ?? startupStages[0];
      setEventLog(`${stage.dashboardTitle}: ${stage.flow}`);
      return next;
    });
    setTransitionPulse((current) => current + 1);
  };

  const goToPreviousStage = () => {
    setStageIndex((current) => {
      const next = Math.max(current - 1, 0);
      const stage = startupStages[next] ?? startupStages[0];
      setEventLog(`${stage.dashboardTitle}: ${stage.flow}`);
      return next;
    });
    setTransitionPulse((current) => current + 1);
  };

  const isFinalStage = stageIndex === startupStages.length - 1;

  return (
    <section className="fixed inset-0 z-[100] overflow-hidden bg-[#f8fbfb] text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(19,184,207,0.16),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(255,129,57,0.13),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(238,247,248,0.86))]" />

      <div className="relative z-10 flex h-dvh flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex shrink-0 items-center justify-between rounded-full bg-white/55 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-theme shadow-sm backdrop-blur-xl">
          <Link href="/" className="text-foreground/70 transition hover:text-foreground">
            Scott Williams
          </Link>
          <div className="hidden gap-4 text-foreground/45 sm:flex">
            <span>Soft menu</span>
            <span>No scroll</span>
            <span>Selective 3D</span>
          </div>
          <button type="button" onClick={resetExperience} className="rounded-full bg-white/70 px-3 py-1 text-[0.62rem] text-accent shadow-sm">
            Reset
          </button>
        </nav>

        {launching ? (
          <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden bg-[#061923]/82 backdrop-blur-sm">
            <div className="absolute left-1/2 top-[64%] h-40 w-1 -translate-x-1/2 rounded-full bg-gradient-to-t from-accent via-white to-transparent blur-sm animate-pulse" />
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 animate-[rocketLaunch_1.05s_ease-in_forwards] text-7xl drop-shadow-[0_20px_40px_rgba(255,129,57,0.55)]">
              🚀
            </div>
            <div className="absolute inset-x-6 bottom-12 rounded-[2rem] bg-white/12 p-5 text-center text-white shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-200">startup ignition</p>
              <p className="mt-2 font-display text-3xl font-black tracking-[-0.05em]">Launching {selectedBusiness.name}</p>
            </div>
            <style jsx>{`
              @keyframes rocketLaunch {
                0% { transform: translate(-50%, 0) rotate(-12deg) scale(0.92); opacity: 0.35; }
                22% { opacity: 1; }
                100% { transform: translate(-50%, -78vh) rotate(8deg) scale(1.18); opacity: 0; }
              }
            `}</style>
          </div>
        ) : null}

        {!launched ? (
          <div className="grid flex-1 place-items-center overflow-hidden py-6">
            <div className="min-w-0 w-full max-w-5xl space-y-5 text-center">
              <div className="mx-auto max-w-3xl space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">Startup generator</p>
                <h1 className="font-display text-4xl font-black leading-[0.9] tracking-[-0.07em] text-foreground sm:text-7xl lg:text-8xl">
                  Pick a business. Launch the system.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-muted sm:text-lg">
                  A guided Agentic Engineering simulator. Choose the startup scenario, then enter a dashboard where flows, agents, metrics, and key decisions appear as you go deeper.
                </p>
              </div>

              <div className="min-w-0 w-full overflow-hidden">
                <div className="flex min-w-0 w-full gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
                {v2Businesses.map((business) => {
                  const isSelected = selectedBusiness.id === business.id;
                  return (
                    <button
                      key={business.id}
                      type="button"
                      onClick={() => handleSelectBusiness(business.id)}
                      className={`min-w-[78vw] rounded-[1.7rem] p-5 text-left shadow-sm transition-all duration-300 sm:min-w-0 ${isSelected ? "scale-[1.02] bg-foreground text-white shadow-2xl shadow-foreground/20" : "bg-white/75 text-foreground backdrop-blur hover:-translate-y-1"}`}
                      aria-pressed={isSelected}
                    >
                      <span className={`mb-4 inline-flex rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] ${isSelected ? "bg-white/15 text-white" : "bg-orange-100 text-orange-700"}`}>
                        {isSelected ? "Selected" : "Startup"}
                      </span>
                      <h2 className="font-display text-xl font-black">{business.name}</h2>
                      <p className={`mt-3 text-sm leading-6 ${isSelected ? "text-white/70" : "text-muted"}`}>{business.startingProblem}</p>
                    </button>
                  );
                })}
                </div>
              </div>

              <button type="button" onClick={launchGenerator} className="inline-flex rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_50px_rgba(255,129,57,0.34)] transition hover:-translate-y-1">
                Launch Startup Generator
              </button>
            </div>
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 gap-4 py-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid min-h-0 gap-4 grid-rows-[minmax(13rem,1fr)_auto]">
              <div className="relative min-h-0 overflow-hidden rounded-[2rem] bg-white/70 shadow-[0_30px_90px_rgba(11,90,107,0.14)] backdrop-blur-xl">
                <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between rounded-full bg-white/68 px-4 py-2 text-[0.64rem] font-black uppercase tracking-[0.2em] text-theme shadow-sm backdrop-blur">
                  <span>{selectedBusiness.name}</span>
                  <span>Live system map</span>
                </div>
                <BusinessConstellationScene
                  businesses={v2Businesses}
                  selectedBusinessId={selectedBusiness.id}
                  completed={completed}
                  onSelectBusiness={handleSelectBusiness}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/88 to-transparent" />
              </div>

              <div className="rounded-[1.6rem] bg-white/68 p-4 shadow-sm backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.64rem] font-black uppercase tracking-[0.22em] text-muted">Portfolio health</p>
                    <p className="text-2xl font-black text-foreground">{portfolioState}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${stateBadgeClass(portfolioState)}`}>{Math.round(portfolioProgress)}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-smoke">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent via-theme to-[#13b8cf] transition-all duration-700" style={{ width: `${portfolioProgress}%` }} />
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{eventLog}</p>
              </div>
            </div>

            <div className="flex min-h-0 flex-col gap-3 overflow-hidden rounded-[2rem] bg-white/62 p-3 shadow-[0_30px_90px_rgba(20,29,56,0.10)] backdrop-blur-xl sm:p-4">
              <div className="flex shrink-0 items-center justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-accent">Dashboard interface</p>
                  <h2 className="font-display text-2xl font-black tracking-[-0.05em]">Startup dashboard</h2>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <button type="button" onClick={goToNextStage} disabled={isFinalStage} className="rounded-full bg-foreground px-4 py-2 text-xs font-black text-white disabled:opacity-45">
                    Next Stage
                  </button>
                  <button type="button" onClick={autoOrchestrate} className="rounded-full bg-white px-4 py-2 text-xs font-black text-theme shadow-sm">
                    Auto
                  </button>
                  <Link href="/#contact-sec" className="rounded-full bg-accent px-4 py-2 text-xs font-black text-white">
                    Book review
                  </Link>
                </div>
              </div>

              <div className="shrink-0 rounded-[1.2rem] bg-[#f8fbfb]/90 p-2">
                <div className="flex gap-1 overflow-x-auto text-center text-[0.55rem] font-black uppercase tracking-[0.07em] text-muted">
                  {flowSteps.map((step, index) => (
                    <span key={step} className={`min-w-fit rounded-full px-2.5 py-2 transition-all duration-500 ${index <= stageIndex ? "bg-white text-theme shadow-sm" : "bg-transparent"}`}>{step}</span>
                  ))}
                </div>
              </div>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                <div key={`${currentStage.id}-${transitionPulse}`} className="animate-[stageIn_520ms_ease-out] rounded-[1.3rem] bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-muted">Stage {stageIndex + 1} / {startupStages.length}</p>
                      <h3 className="mt-1 font-display text-xl font-black sm:text-2xl">{currentStage.dashboardTitle}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{currentStage.prompt}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-[0.62rem] font-black text-theme">{currentStage.metric}</span>
                        {selectedBusiness.metrics.map((metric) => {
                          const improved = Boolean(completed[selectedBusiness.id]);
                          const state = improved ? metric.after : metric.before;
                          return (
                            <span key={metric.label} className={`rounded-full px-2.5 py-1 text-[0.62rem] font-black ${stateBadgeClass(state)}`}>
                              {metric.label}: {state}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <span className="rounded-full bg-smoke px-3 py-1 text-xs font-black text-theme">{currentStage.label}</span>
                  </div>
                  <style jsx>{`
                    @keyframes stageIn {
                      from { opacity: 0; transform: translateY(14px) scale(0.985); }
                      to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                  `}</style>
                </div>

                <div className="hidden gap-2 sm:grid-cols-3">
                  {v2Agents.map((agent) => {
                    const active = selectedAgent.id === agent.id;
                    const recommended = selectedBusiness.recommendedAgentIds.includes(agent.id);
                    return (
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => setSelectedAgentId(agent.id)}
                        className={`rounded-2xl p-3 text-left shadow-sm ${agentAccentClass(agent.id, active)}`}
                        aria-pressed={active}
                      >
                        <span className="text-[0.55rem] font-black uppercase tracking-[0.14em] opacity-70">{recommended ? "Recommended" : "Available"}</span>
                        <h4 className="mt-1 font-display text-base font-black">{agent.shortName}</h4>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 opacity-75">{agent.focus}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="grid gap-2 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.3rem] bg-white p-3 shadow-sm">
                    <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-muted">Badges earned</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {earnedBadges.map((stage) => (
                        <span key={stage.id} title={stage.badgeDescription} className="rounded-full bg-foreground px-3 py-1.5 text-[0.64rem] font-black text-white shadow-sm">
                          🏅 {stage.badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.3rem] bg-[#fff8f3] p-3 shadow-sm">
                    <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-accent">Examples / Scott&apos;s experience</p>
                    <h4 className="mt-1 font-display text-lg font-black">{currentStage.exampleTitle}</h4>
                    <p className="mt-1 line-clamp-3 text-sm leading-6 text-muted">{currentStage.exampleBody}</p>
                  </div>
                </div>

                <div className="rounded-[1.3rem] bg-[#f8fbfb] p-3">
                  <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-muted">Important information</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-foreground">
                    {currentStage.flow} {currentStage.surprise}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={goToPreviousStage} disabled={stageIndex === 0} className="rounded-full bg-white px-5 py-3 text-sm font-black text-theme shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40">
                      Back
                    </button>
                    <button type="button" onClick={goToNextStage} disabled={isFinalStage} className="rounded-full bg-foreground px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45">
                      {isFinalStage ? "IPO Reached" : "Next Stage"}
                    </button>
                    <button type="button" onClick={assignAgent} className="rounded-full bg-accent px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
                      Assign Agent
                    </button>
                    <button type="button" onClick={autoOrchestrate} className="rounded-full bg-white px-5 py-3 text-sm font-black text-theme shadow-sm transition hover:-translate-y-0.5">
                      Auto Flow
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
