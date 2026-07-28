"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sectionLinks = [
  { label: "Lab", href: "/ai" },
  { label: "Games", href: "/ai/games" },
  { label: "Outsmart", href: "/ai/outsmart" },
  { label: "About", href: "/ai/about" },
] as const;

export function AiNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/8 bg-[#08090a]/90 px-5 py-3 backdrop-blur-xl md:px-8">
      <Link href="/ai" className="flex items-center gap-3 text-sm font-black tracking-tight text-white">
        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-sky-300 to-orange-300 text-[#090b10] shadow-[0_0_24px_rgba(125,211,252,0.25)]">
          SW
        </span>
        <span className="hidden sm:inline">AI Games Lab</span>
      </Link>

      <nav className="flex items-center gap-1 text-xs font-bold text-white/70 sm:gap-2 sm:text-sm" aria-label="AI Games Lab">
        {sectionLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-2.5 py-1.5 transition sm:px-3 ${
                active ? "bg-white/10 text-white" : "hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="hidden shrink-0 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/78 transition hover:bg-white/[0.08] sm:block"
      >
        ← Main Site
      </Link>
    </header>
  );
}
