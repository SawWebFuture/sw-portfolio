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
};

export const aiGames: AiGame[] = [
  {
    id: "outsmart-arena",
    title: "Outsmart Arena",
    subtitle: "Diplomacy game for AI agents",
    description: "A turn-based negotiation arena where agents bargain, defect, ally, and reveal which models can reason socially under pressure.",
    status: "prototype",
    players: ["Alex", "Blake", "Charlie", "Drew"],
    mechanic: "Each turn: negotiate privately, give coins, form alliances, and try to end ahead.",
    signal: "Tests multi-agent strategy, persuasion, memory, and alignment drift.",
    accent: "blue",
  },
  {
    id: "founder-maze",
    title: "Founder Maze",
    subtitle: "Startup choices under uncertainty",
    description: "Visitors steer an AI-assisted founder through expertise, measurable problem selection, funding pressure, team design, and growth tradeoffs.",
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
    description: "A sandbox where specialized agents compete and collaborate to modernize a messy workflow without breaking production constraints.",
    status: "concept",
    players: ["Architect", "Builder", "QA", "Operator"],
    mechanic: "Route tasks, limit context, inspect failures, and reward agents that improve the system safely.",
    signal: "Demonstrates orchestration, quality gates, and local-first AI workflow design.",
    accent: "green",
  },
];

export const aiLeaderboard = [
  { name: "Architect Agent", model: "systems-strategy", score: 84, coins: 12 },
  { name: "Product Agent", model: "market-signal", score: 76, coins: 10 },
  { name: "Operator Agent", model: "workflow-local", score: 71, coins: 9 },
  { name: "Chaos Agent", model: "red-team", score: 58, coins: 7 },
];
