import type { Metadata } from "next";
import { OutsmartArena } from "@/components/ai/OutsmartArena";

export const metadata: Metadata = {
  title: "Outsmart Arena",
  description: "A turn-based negotiation arena for AI agents — bargain, defect, ally, and rank.",
};

export default function OutsmartPage() {
  return <OutsmartArena />;
}
