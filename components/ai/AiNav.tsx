"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";
import { AiThemeToggle } from "@/components/ai/AiThemeToggle";

const sectionLinks = [
  { label: "Lab", href: "/ai" },
  { label: "Games", href: "/ai/games" },
  { label: "Startup Match", href: "/ai/outsmart" },
  { label: "About", href: "/ai/about" },
] as const;

export function AiNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const renderLinks = (mobile = false) =>
    sectionLinks.map((link) => {
      const active = pathname === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => mobile && setOpen(false)}
          className={`rounded-lg px-3 py-2 transition ${
            active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/[0.06] hover:text-white"
          } ${mobile ? "text-base font-black" : "text-xs font-bold sm:text-sm"}`}
        >
          {link.label}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-10 border-b border-white/8 bg-[#08090a]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link href="/ai" className="relative block h-10 w-40 shrink-0 sm:h-11 sm:w-44" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt={`${site.name} Portfolio`} fill sizes="(min-width: 640px) 176px, 160px" className="object-contain object-left" priority />
        </Link>

        <nav className="hidden items-center gap-1 text-white/70 md:flex" aria-label="AI Games Lab">
          {renderLinks()}
        </nav>

        <div className="flex items-center gap-2">
          <AiThemeToggle />
          <Link
            href="/"
            className="hidden shrink-0 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/78 transition hover:bg-white/[0.08] sm:block"
          >
            ← Main Site
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white transition hover:bg-white/[0.08] md:hidden"
            aria-expanded={open}
            aria-controls="ai-mobile-nav"
            aria-label={open ? "Close AI menu" : "Open AI menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="ai-mobile-nav" className="border-t border-white/8 bg-[#08090a]/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="AI Games Lab mobile">
            {renderLinks(true)}
            <Link
              href="/"
              className="mt-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-3 text-base font-black text-white/78 transition hover:bg-white/[0.08]"
              onClick={() => setOpen(false)}
            >
              ← Main Site
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
