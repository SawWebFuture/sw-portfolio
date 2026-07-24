"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { counters } from "@/data/about";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function CounterItem({
  value,
  label,
  icon,
  active,
}: {
  value: number;
  label: string;
  icon: string;
  active: boolean;
}) {
  const count = useCountUp(value, active);

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-12 w-12 shrink-0">
        <Image src={icon} alt="" fill className="object-contain brightness-0 invert" />
      </div>
      <div>
        <p className="font-display text-3xl font-bold text-white sm:text-4xl">
          {count}
          <span className="text-accent">+</span>
        </p>
        <p className="text-sm text-white/80">{label}</p>
      </div>
    </div>
  );
}

export function Counters() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-theme py-12 sm:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {counters.map((item) => (
          <CounterItem
            key={item.label}
            value={item.value}
            label={item.label}
            icon={item.icon}
            active={active}
          />
        ))}
      </div>
    </section>
  );
}
