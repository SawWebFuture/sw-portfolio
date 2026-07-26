import type { Metadata } from "next";
import { V2OrchestratorExperience } from "@/components/v2/V2OrchestratorExperience";

export const metadata: Metadata = {
  title: "New Portfolio Prototype",
  description:
    "A gamified Agentic Engineering prototype where visitors orchestrate multiple businesses with simulated AI systems agents.",
};

export default function NewPortfolioPage() {
  return <V2OrchestratorExperience />;
}
