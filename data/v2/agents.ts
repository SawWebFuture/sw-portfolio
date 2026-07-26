export type AgentId = "architecture" | "product" | "quality";

export type Agent = {
  id: AgentId;
  name: string;
  shortName: string;
  focus: string;
  description: string;
  accent: "teal" | "orange" | "blue";
};

export const v2Agents: Agent[] = [
  {
    id: "architecture",
    name: "Architecture Agent",
    shortName: "Architecture",
    focus: "Turns messy systems into an operable architecture.",
    description: "Maps technical risk, dependencies, and product goals into a clear system shape.",
    accent: "teal",
  },
  {
    id: "product",
    name: "Product Agent",
    shortName: "Product",
    focus: "Connects features to business and customer signal.",
    description: "Keeps agentic workflows anchored to user value, roadmap clarity, and feedback loops.",
    accent: "orange",
  },
  {
    id: "quality",
    name: "Quality Agent",
    shortName: "Quality",
    focus: "Protects reliability, privacy, and long-term maintainability.",
    description: "Adds guardrails so AI systems can scale without becoming fragile or risky.",
    accent: "blue",
  },
];
