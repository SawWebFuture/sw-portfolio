export type StartupStageId =
  | "idea"
  | "get-a-job"
  | "funding"
  | "team"
  | "build"
  | "growth"
  | "vc-decision"
  | "power-struggle"
  | "reorder"
  | "ipo";

export type StartupStage = {
  id: StartupStageId;
  label: string;
  dashboardTitle: string;
  prompt: string;
  flow: string;
  metric: string;
  surprise: string;
  badge: string;
  badgeDescription: string;
  exampleTitle: string;
  exampleBody: string;
};

export const startupStages: StartupStage[] = [
  {
    id: "idea",
    label: "Idea",
    dashboardTitle: "Idea signal detected",
    prompt: "The founder has AI ambition, but the product shape is still noisy.",
    flow: "Map the sharpest user pain before adding automation.",
    metric: "Clarity: Noisy → Focused",
    surprise: "A small signal core appears in the system map.",
    badge: "Signal Finder",
    badgeDescription: "Spotted the real customer signal before building too much.",
    exampleTitle: "Product signal work",
    exampleBody: "Scott's experience connects founder ambition, customer pain, and architecture choices before the system hardens around the wrong idea.",
  },
  {
    id: "get-a-job",
    label: "Get a job",
    dashboardTitle: "Learn inside a startup",
    prompt: "Before becoming the orchestrator, you enter the system and learn how startup pressure really feels.",
    flow: "Join a startup, observe messy incentives, and learn how shipping, users, money, and architecture collide.",
    metric: "Experience: Theory → Operator instinct",
    surprise: "A first-person field note unlocks in the dashboard.",
    badge: "Startup Apprentice",
    badgeDescription: "Earned operating context by learning inside a real startup environment.",
    exampleTitle: "Startup operating context",
    exampleBody: "Scott's examples are not trophies; they are evidence of learning from real product, team, and delivery pressure.",
  },
  {
    id: "funding",
    label: "Funding",
    dashboardTitle: "Funding path opens",
    prompt: "Capital can accelerate the system — or amplify the wrong architecture.",
    flow: "Decide which technical bet deserves fuel first.",
    metric: "Runway leverage: Fragile → Directed",
    surprise: "Investor lights orbit the business node.",
    badge: "Runway Architect",
    badgeDescription: "Turned funding pressure into an intentional technical path.",
    exampleTitle: "Strategic architecture",
    exampleBody: "Scott helps translate business ambition into staged systems decisions instead of expensive, brittle rewrites.",
  },
  {
    id: "team",
    label: "Team",
    dashboardTitle: "Team assembly",
    prompt: "The business needs builders, operators, and agents moving in the same direction.",
    flow: "Assign roles so humans and agents stop duplicating effort.",
    metric: "Coordination: Manual → Orchestrated",
    surprise: "Agent helpers begin routing between departments.",
    badge: "Team Orchestrator",
    badgeDescription: "Aligned humans, workflows, and agents around shared outcomes.",
    exampleTitle: "Tech lead experience",
    exampleBody: "Scott's leadership experience shows up in the way he structures collaboration, ownership, and delivery loops.",
  },
  {
    id: "build",
    label: "Build",
    dashboardTitle: "Product build loop",
    prompt: "The prototype needs to become a product system people can trust.",
    flow: "Connect product feedback, architecture, and quality gates.",
    metric: "Build quality: Demo → Workflow",
    surprise: "The core product block locks into place.",
    badge: "Builder Loop",
    badgeDescription: "Converted a demo into a repeatable product-building system.",
    exampleTitle: "Shipped product systems",
    exampleBody: "Scott's portfolio examples become proof nodes inside the simulator: product work, workflows, architecture, and AI systems that moved beyond slides.",
  },
  {
    id: "growth",
    label: "Growth",
    dashboardTitle: "Growth pressure rising",
    prompt: "Usage is increasing, and hidden system drag starts to surface.",
    flow: "Scale the useful workflows without scaling the chaos.",
    metric: "Growth signal: Noisy → Actionable",
    surprise: "Water-like flow stabilizes around the business node.",
    badge: "Growth Stabilizer",
    badgeDescription: "Kept the system useful while demand increased.",
    exampleTitle: "Modernization under pressure",
    exampleBody: "Scott's modernization experience is about reducing delivery risk while a business keeps operating.",
  },
  {
    id: "vc-decision",
    label: "VC fund?",
    dashboardTitle: "VC funding decision",
    prompt: "More capital could speed up growth, but it changes incentives and pressure.",
    flow: "Choose whether to take VC fuel or stay focused on sustainable leverage.",
    metric: "Control: Unclear → Intentional",
    surprise: "Two timeline paths briefly split, then recombine.",
    badge: "Capital Strategist",
    badgeDescription: "Understood the tradeoff between speed, control, and system maturity.",
    exampleTitle: "Business-aware technical judgment",
    exampleBody: "Scott frames architecture as a business decision, not just an engineering preference.",
  },
  {
    id: "power-struggle",
    label: "Power",
    dashboardTitle: "Power struggle",
    prompt: "Leadership, investors, users, and technical reality are pulling in different directions.",
    flow: "Use architecture and product truth to rebalance the system.",
    metric: "Alignment: Tense → Governed",
    surprise: "Conflicting nodes pulse red until the system finds balance.",
    badge: "Alignment Mediator",
    badgeDescription: "Rebalanced competing priorities around the system's truth.",
    exampleTitle: "Systems architecture leadership",
    exampleBody: "Scott's examples should show how he handles ambiguity, stakeholder tension, and technical constraints without losing the product goal.",
  },
  {
    id: "reorder",
    label: "Reorder",
    dashboardTitle: "Reorder the company system",
    prompt: "The old operating model cannot support the next phase.",
    flow: "Reorganize teams, workflows, and agents around the highest-leverage loops.",
    metric: "Operating model: Tangled → Composable",
    surprise: "The constellation rearranges into a cleaner pattern.",
    badge: "System Reorderer",
    badgeDescription: "Refactored the operating model without losing momentum.",
    exampleTitle: "Agentic Engineering proof",
    exampleBody: "Scott's Agentic Engineering work becomes the practical proof: agents are useful when they are placed into coherent systems.",
  },
  {
    id: "ipo",
    label: "IPO",
    dashboardTitle: "IPO-ready maturity",
    prompt: "The goal is not hype. It is reliability, trust, leverage, and compounding value.",
    flow: "Package the system into a company people can trust at scale.",
    metric: "Readiness: Scalable → IPO-ready",
    surprise: "A final tree/constellation reveal shows the system has matured.",
    badge: "IPO-Ready Operator",
    badgeDescription: "Built toward maturity, trust, and scale — not just novelty.",
    exampleTitle: "Why hire Scott",
    exampleBody: "The examples section resolves into the hiring argument: Scott can guide AI/product systems through messy real-world stages.",
  },
];
