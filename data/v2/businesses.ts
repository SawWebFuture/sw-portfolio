import type { AgentId } from "./agents";

export type BusinessId = "ai-startup" | "health-platform" | "finance-network";

export type MaturityState = "Noisy" | "Coherent" | "Durable" | "Scalable" | "IPO-ready";

export type BusinessMetric = {
  label: string;
  before: MaturityState;
  after: MaturityState;
};

export type Business = {
  id: BusinessId;
  name: string;
  sector: string;
  startingProblem: string;
  stakes: string;
  recommendedAgentIds: AgentId[];
  metrics: BusinessMetric[];
  proofHint: string;
  position: [number, number, number];
};

export const v2Businesses: Business[] = [
  {
    id: "ai-startup",
    name: "AI Startup",
    sector: "Agentic product",
    startingProblem: "Fragile demo energy, unclear architecture, and too many disconnected AI experiments.",
    stakes: "Without architecture, AI ambition becomes noise instead of leverage.",
    recommendedAgentIds: ["architecture", "product"],
    metrics: [
      { label: "Complexity", before: "Noisy", after: "Coherent" },
      { label: "AI usefulness", before: "Noisy", after: "Durable" },
    ],
    proofHint: "Aury AI-style systems thinking: turn AI product ambition into something users can trust.",
    position: [-1.7, 0.75, 0],
  },
  {
    id: "health-platform",
    name: "Health Platform",
    sector: "Privacy-sensitive workflow",
    startingProblem: "Manual workflows, sensitive data paths, and growing pressure for local-first AI assistance.",
    stakes: "Privacy and reliability become business strategy when AI touches sensitive workflows.",
    recommendedAgentIds: ["quality", "architecture"],
    metrics: [
      { label: "Privacy/control", before: "Noisy", after: "Durable" },
      { label: "Reliability", before: "Coherent", after: "Scalable" },
    ],
    proofHint: "Henry Meds-style operational pressure: safer systems around real health workflows.",
    position: [0.15, -0.15, 0],
  },
  {
    id: "finance-network",
    name: "Finance Network",
    sector: "Trust network",
    startingProblem: "High-trust users, reliability expectations, and legacy edges that slow modernization.",
    stakes: "Scale exposes technical debt; the right architecture turns trust into compounding value.",
    recommendedAgentIds: ["quality", "product"],
    metrics: [
      { label: "Business signal", before: "Noisy", after: "Coherent" },
      { label: "Readiness", before: "Coherent", after: "Scalable" },
    ],
    proofHint: "iConnections-style credibility: production-grade systems for high-trust communities.",
    position: [1.65, 0.7, 0],
  },
];
