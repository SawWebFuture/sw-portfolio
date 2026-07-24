import Image from "next/image";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="service-sec" className="scroll-mt-24 bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-theme">
            {services.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {services.title}{" "}
            <span className="font-medium text-theme">{services.titleAccent}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.items.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-lg border border-border bg-white transition hover:-translate-y-1 hover:border-theme/40 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 40vw, 20vw"
                />
              </div>
              <div className="p-5">
                <div className="relative mb-3 h-10 w-10">
                  <Image src={service.icon} alt="" fill className="object-contain" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
