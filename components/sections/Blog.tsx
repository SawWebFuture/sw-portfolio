import Image from "next/image";
import { posts } from "@/data/posts";
import { site } from "@/data/site";

export function Blog() {
  const [featuredPost, ...secondaryPosts] = posts.items;

  return (
    <section id="blog-sec" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme sm:text-sm">
            {posts.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {posts.title}{" "}
            <span className="font-semibold text-theme">{posts.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {posts.intro}
          </p>
        </div>

        <article className="mx-auto mt-12 overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#ffffff_0%,#f3f8f9_100%)] shadow-[0_24px_90px_rgba(20,29,56,0.1)] lg:grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative min-h-64 overflow-hidden sm:min-h-80 lg:min-h-full">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/78 p-4 shadow-sm backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme">
                Featured transition note
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">{featuredPost.date}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold text-muted">By {featuredPost.author}</p>
            <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              {featuredPost.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {featuredPost.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredPost.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-theme shadow-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={featuredPost.href}
                className="inline-flex items-center rounded-full bg-theme px-5 py-3 text-sm font-bold text-white transition hover:bg-theme-dark"
              >
                Talk Agentic Engineering →
              </a>
            </div>
          </div>
        </article>

        {secondaryPosts.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {secondaryPosts.map((post) => (
              <article
                key={post.title}
                className="overflow-hidden rounded-[1.75rem] bg-[#f3f8f9] shadow-[0_18px_60px_rgba(20,29,56,0.07)] sm:grid sm:grid-cols-[0.8fr_1fr]"
              >
                <div className="relative min-h-48 sm:min-h-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {post.date}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center text-sm font-bold text-theme transition hover:text-theme-dark"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mx-auto mt-14 max-w-3xl rounded-[2rem] bg-[linear-gradient(120deg,#0b5a6b,#0a3f4b)] px-6 py-10 text-center text-white shadow-[0_24px_80px_rgba(11,90,107,0.2)] sm:px-10">
          <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
            Ready to build an agentic system?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Let&apos;s talk about autonomous agents, local-first AI workflows, modernization, or your
            next product architecture move.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Make Appointment
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
