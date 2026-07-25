import { ServicesAssemblyScene } from "@/components/ServicesAssemblyScene";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="service-sec" className="scroll-mt-24 overflow-hidden bg-white py-14 sm:py-18 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme sm:text-sm">
            {services.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {services.title}{" "}
            <span className="font-semibold text-theme">{services.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {services.intro}
          </p>

          <div className="mt-8 grid gap-4">
            {services.items.map((service, index) => (
              <article
                key={service.title}
                className="group rounded-[1.75rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(243,248,249,0.72))] p-5 shadow-[0_18px_60px_rgba(20,29,56,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(20,29,56,0.13)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-theme/10 font-display text-sm font-bold text-theme transition group-hover:bg-theme group-hover:text-white">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                      {service.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto h-[22rem] w-full max-w-md overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_25%_18%,rgba(255,129,57,0.16),transparent_34%),radial-gradient(circle_at_78%_72%,rgba(19,184,207,0.18),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.96)_0%,rgba(240,247,248,0.72)_100%)] shadow-[0_28px_90px_rgba(20,29,56,0.12)] sm:h-[27rem] lg:max-w-lg">
            <ServicesAssemblyScene className="opacity-100" />
            <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between rounded-full bg-white/72 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted shadow-sm backdrop-blur-md">
              <span>Distributed Parts</span>
              <span className="text-theme">One System</span>
            </div>
            <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-[1.5rem] bg-white/64 p-4 shadow-sm backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Assembly pattern
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold leading-tight text-foreground">
                From scattered boxes to one transparent architecture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
