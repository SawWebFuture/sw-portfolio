import type { Metadata } from "next";
import { AiGamesArena } from "@/components/ai/AiGamesArena";

export const metadata: Metadata = {
  title: "AI Games",
  description: "Interactive AI games and agent arenas by Scott Williams.",
};

export default function AiPage() {
  return <AiGamesArena />;
}
