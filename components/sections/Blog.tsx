import Image from "next/image";
import { posts } from "@/data/posts";
import { site } from "@/data/site";

export function Blog() {
  const post = posts.items[0];

  return (
    <section id="blog-sec" className="scroll-mt-24 bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-theme">
            {posts.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {posts.title}{" "}
            <span className="font-medium text-theme">{posts.titleAccent}</span>
          </h2>
        </div>

        <article className="mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-lg border border-border bg-white shadow-sm md:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-56 md:min-h-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="text-sm text-muted">{post.date}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">By {post.author}</p>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-theme transition hover:text-theme-dark"
              >
                Read More →
              </a>
            </div>
          </div>
        </article>

        <div className="mx-auto mt-14 max-w-3xl rounded-lg bg-[linear-gradient(120deg,#0b5a6b,#0a3f4b)] px-6 py-10 text-center text-white sm:px-10">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Ready to build something great?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Let&apos;s talk about your next mobile or web product. Book a call or reach out on
            LinkedIn.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Make Appointment
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
