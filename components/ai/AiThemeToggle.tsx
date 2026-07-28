"use client";

import { useEffect, useState } from "react";

type AiTheme = "dark" | "light";

const storageKey = "sw-ai-theme";

export function AiThemeToggle() {
  const [theme, setTheme] = useState<AiTheme>(() => {
    if (typeof window === "undefined") return "dark";
    const savedTheme = window.localStorage.getItem(storageKey);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.aiTheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: AiTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    document.documentElement.dataset.aiTheme = nextTheme;
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="shrink-0 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/78 transition hover:bg-white/[0.08]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span className="ml-2 hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
