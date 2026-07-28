import { AiNav } from "@/components/ai/AiNav";

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ai-route-shell fixed inset-0 z-[100] overflow-y-auto bg-[#08090a] text-white transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(80,170,255,0.16),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(255,129,57,0.11),transparent_28%),radial-gradient(circle_at_52%_84%,rgba(65,255,177,0.1),transparent_30%),linear-gradient(180deg,#111214,#08090a_38%,#050506)]" />
      <div className="relative z-10 flex min-h-full flex-col">
        <AiNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
