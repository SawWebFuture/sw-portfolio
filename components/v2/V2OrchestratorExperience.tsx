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

const homeBenefits = [
  { icon: "△", title: "Turn expertise into leverage", detail: "Build once. Help many." },
  { icon: "✦", title: "Solve a measurable problem", detail: "Focus creates clarity and demand." },
  { icon: "◌", title: "Use AI & agents to move faster", detail: "Automate work. Multiply impact." },
  { icon: "×", title: "Create value without a huge team", detail: "Systems over headcount." },
  { icon: "◇", title: "Build systems that can scale", detail: "Design for compounding outcomes." },
  { icon: "▾", title: "Enter markets that once required capital", detail: "Local-first tools. Global distribution." },
];

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
  const [eventLog, setEventLog] = useState("Launch the generator, then identify expertise and a measurable problem.");

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
    setEventLog("Launch the generator, then identify expertise and a measurable problem.");
  };

  const launchGenerator = () => {
    setLaunching(true);
    setStageIndex(0);
    setTransitionPulse((current) => current + 1);
    setEventLog("Rocket ignition. Startup system coming online.");

    window.setTimeout(() => {
      setLaunching(false);
      setLaunched(true);
      setEventLog("Generator launched. Next versions will identify expertise and a measurable problem before shaping the startup system.");
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
    <section className="fixed inset-0 z-[100] overflow-hidden bg-[#061923] text-foreground">
      {!launched ? (
        <>
          <div className="absolute inset-0 bg-[url('/images/startup-generator-future.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,210,120,0.14),transparent_30%),linear-gradient(90deg,rgba(4,16,24,0.88),rgba(6,25,35,0.48)_46%,rgba(6,25,35,0.18)),linear-gradient(0deg,rgba(4,16,24,0.68),rgba(4,16,24,0.12)_48%,rgba(4,16,24,0.42))]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(19,184,207,0.16),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(255,129,57,0.13),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(238,247,248,0.86))]" />
      )}

      <div className="relative z-10 flex h-dvh flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        {launched ? (
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
        ) : null}

        {launching ? (
          <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden bg-[#061923]/82 backdrop-blur-sm">
            <div className="absolute left-1/2 top-[64%] h-40 w-1 -translate-x-1/2 rounded-full bg-gradient-to-t from-accent via-white to-transparent blur-sm animate-pulse" />
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 animate-[rocketLaunch_1.05s_ease-in_forwards] text-7xl drop-shadow-[0_20px_40px_rgba(255,129,57,0.55)]">
              🚀
            </div>
            <div className="absolute inset-x-6 bottom-12 rounded-[2rem] bg-white/12 p-5 text-center text-white shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-200">startup ignition</p>
              <p className="mt-2 font-display text-3xl font-black tracking-[-0.05em]">Launching the generator</p>
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
          <div className="grid flex-1 overflow-hidden py-0">
            <div className="relative min-h-0 overflow-hidden rounded-[1.8rem] border border-[#d6b35d]/30 bg-[#061923]/60 shadow-[0_30px_110px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
              <div className="absolute left-3 top-3 grid size-9 place-items-center rounded-full border border-white/25 bg-[#101633]/68 text-sm font-black text-white/88 backdrop-blur-md">
                1
              </div>

              <div className="absolute inset-y-0 left-0 w-[min(58rem,78vw)] bg-gradient-to-r from-[#04101a]/82 via-[#04101a]/56 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#02070d]/86 to-transparent" />

              <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
                {["✧", "▥", "♟", "▰"].map((icon) => (
                  <div key={icon} className="grid size-11 place-items-center rounded-full border border-white/18 bg-[#061923]/48 text-lg text-[#f5d98a] shadow-[0_0_28px_rgba(245,217,138,0.12)] backdrop-blur-md">
                    {icon}
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex h-full max-w-[27rem] flex-col justify-center px-7 py-6 text-left text-white sm:px-10 lg:px-12">
                <h1 className="font-display text-[2.15rem] font-black leading-[0.98] tracking-[-0.06em] text-[#fff7db] drop-shadow-[0_16px_42px_rgba(0,0,0,0.55)] sm:text-[2.85rem] lg:text-[3.15rem]">
                  The future will be full of startups.
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/78 sm:text-[0.95rem]">
                  Technology, AI agents, and modern software have removed old barriers. Now, more people can turn knowledge into impact.
                </p>

                <div className="mt-4 space-y-2">
                  {homeBenefits.map((benefit) => (
                    <div key={benefit.title} className="grid grid-cols-[1.9rem_1fr] gap-2.5 text-sm">
                      <span className="grid size-7 place-items-center rounded-full border border-[#f4c766]/35 bg-[#081b22]/68 text-[0.68rem] font-black text-[#f7d77d] shadow-[0_0_20px_rgba(244,199,102,0.16)] backdrop-blur-md">
                        {benefit.icon}
                      </span>
                      <span>
                        <span className="block font-black text-[#fff7db]">{benefit.title}</span>
                        <span className="block text-xs leading-4 text-white/60">{benefit.detail}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col items-start gap-3">
                  <button type="button" onClick={launchGenerator} className="inline-flex min-w-[14rem] items-center justify-center gap-3 rounded-lg border border-[#f6c96b]/60 bg-[#8f6422]/80 px-7 py-3.5 text-sm font-black text-[#fff7db] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_18px_45px_rgba(197,139,45,0.35)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-[#a87628]">
                    <span>🚀</span>
                    Launch Startup Generator
                  </button>
                </div>
              </div>

              <p className="absolute inset-x-4 bottom-2 z-10 text-center text-[0.66rem] font-semibold text-white/65">
                Find your expertise. Choose a measurable problem. Build the system.
              </p>
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
