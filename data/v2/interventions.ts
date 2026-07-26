import type { AgentId } from "./agents";
import type { BusinessId, MaturityState } from "./businesses";

export type Intervention = {
  id: string;
  businessId: BusinessId;
  agentId: AgentId;
  label: string;
  before: MaturityState;
  after: MaturityState;
  outcome: string;
  event: string;
};

export const v2Interventions: Intervention[] = [
  {
    id: "ai-startup-architecture",
    businessId: "ai-startup",
    agentId: "architecture",
    label: "Clarify system architecture",
    before: "Noisy",
    after: "Coherent",
    outcome: "The AI Startup gets a product core, cleaner boundaries, and a path from demo to durable workflow.",
    event: "Architecture Agent stabilized the prototype into a coherent system map.",
  },
  {
    id: "ai-startup-product",
    businessId: "ai-startup",
    agentId: "product",
    label: "Find the useful product loop",
    before: "Noisy",
    after: "Durable",
    outcome: "The product loop becomes clearer: fewer experiments, stronger user signal, better roadmap focus.",
    event: "Product Agent turned scattered AI ideas into one useful customer loop.",
  },
  {
    id: "health-platform-quality",
    businessId: "health-platform",
    agentId: "quality",
    label: "Add privacy and reliability guardrails",
    before: "Noisy",
    after: "Durable",
    outcome: "The Health Platform becomes safer for local-first workflows and sensitive operational data.",
    event: "Quality Agent added guardrails before automation scaled risk.",
  },
  {
    id: "health-platform-architecture",
    businessId: "health-platform",
    agentId: "architecture",
    label: "Map secure workflow boundaries",
    before: "Coherent",
    after: "Scalable",
    outcome: "The platform gets clearer boundaries for private AI assistance and future modernization.",
    event: "Architecture Agent separated sensitive workflows from noisy operational complexity.",
  },
  {
    id: "finance-network-quality",
    businessId: "finance-network",
    agentId: "quality",
    label: "Protect trust and reliability",
    before: "Coherent",
    after: "Scalable",
    outcome: "The Finance Network gets stronger reliability posture before scale exposes hidden risk.",
    event: "Quality Agent converted trust requirements into system safeguards.",
  },
  {
    id: "finance-network-product",
    businessId: "finance-network",
    agentId: "product",
    label: "Focus the business signal",
    before: "Noisy",
    after: "Coherent",
    outcome: "The network clarifies which workflows create business value and which ones create drag.",
    event: "Product Agent tuned noisy user activity into actionable business signal.",
  },
];

export function findIntervention(businessId: BusinessId, agentId: AgentId) {
  return v2Interventions.find((intervention) => intervention.businessId === businessId && intervention.agentId === agentId);
}
