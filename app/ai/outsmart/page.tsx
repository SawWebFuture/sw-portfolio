import type { Metadata } from "next";
import { OutsmartArena } from "@/components/ai/OutsmartArena";

export const metadata: Metadata = {
  title: "Startup Competition",
  description:
    "A startup competition game where two LLM founder agents sell measurable solutions to customer agents and race to IPO.",
};

export default function OutsmartPage() {
  return <OutsmartArena />;
}
