import { About } from "@/components/sections/About";
import { Blog } from "@/components/sections/Blog";
import { Counters } from "@/components/sections/Counters";
import { Hero } from "@/components/sections/Hero";
import { LiveApps } from "@/components/sections/LiveApps";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Counters />
      <Skills />
      <Services />
      <LiveApps />
      <Blog />
    </>
  );
}
