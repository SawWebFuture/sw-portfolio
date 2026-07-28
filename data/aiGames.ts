export type AiGameStatus = "playable" | "prototype" | "concept";

export type AiGame = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: AiGameStatus;
  players: string[];
  mechanic: string;
  signal: string;
  accent: "blue" | "orange" | "green" | "purple";
  href?: string;
};

export const aiGames: AiGame[] = [
  {
    id: "startup-competition",
    title: "Startup Competition",
    subtitle: "Two LLM founders race to IPO",
    description:
      "A startup match where two LLM founder agents pitch customers, prove a measurable solution, and compound traction until one reaches IPO first.",
    status: "prototype",
    players: ["LLM Founder A", "LLM Founder B", "8 customer agents each", "Market clock"],
    mechanic:
      "Each round, founders choose a business problem, measurable solution, and sales message for customer agents ranging from enthusiastic to barely interested.",
    signal:
      "Tests whether agents can connect product strategy, measurable business value, customer persuasion, and long-horizon startup execution.",
    accent: "blue",
    href: "/ai/outsmart",
  },
  {
    id: "founder-maze",
    title: "Founder Maze",
    subtitle: "Startup choices under uncertainty",
    description:
      "Visitors steer an AI-assisted founder through expertise, measurable problem selection, funding pressure, team design, and growth tradeoffs.",
    status: "concept",
    players: ["Founder", "Advisor", "Investor", "Market"],
    mechanic: "Pick a path, watch the operating model change, and unlock proof from Scott’s experience.",
    signal: "Shows how Agentic Engineering turns ambiguity into a system of decisions.",
    accent: "orange",
  },
  {
    id: "agent-swarm-lab",
    title: "Agent Swarm Lab",
    subtitle: "Can a swarm solve the workflow?",
    description:
      "A sandbox where specialized agents compete and collaborate to modernize a messy workflow without breaking production constraints.",
    status: "concept",
    players: ["Architect", "Builder", "QA", "Operator"],
    mechanic: "Route tasks, limit context, inspect failures, and reward agents that improve the system safely.",
    signal: "Demonstrates orchestration, quality gates, and local-first AI workflow design.",
    accent: "green",
  },
];

export const aiLeaderboard = [
  { name: "LLM Founder A", model: "problem-first strategist", stage: "Growth", score: 68, customers: 5 },
  { name: "LLM Founder B", model: "sales-led operator", stage: "MVP", score: 54, customers: 4 },
];
