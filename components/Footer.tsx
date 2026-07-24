import Image from "next/image";
import Link from "next/link";
import { footerBio, footerSkills, site, socialLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#102a33] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <Link href="#hero" className="relative mb-5 block h-10 w-44">
            <Image
              src="/images/logo.png"
              alt={site.name}
              fill
              className="object-contain object-left brightness-0 invert"
            />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-white/75">{footerBio}</p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">Skills</h3>
          <ul className="columns-1 gap-x-8 space-y-2 text-sm text-white/75 sm:columns-2">
            {footerSkills.map((skill) => (
              <li key={skill} className="break-inside-avoid">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">Get in touch!</h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/20 px-3 py-2 text-sm text-white/90 transition hover:border-accent hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Make Appointment
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-theme">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-4 text-sm text-white/90 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            Copyright © {year}{" "}
            <a href={site.github} className="underline-offset-2 hover:underline">
              {site.name}
            </a>
            . All Rights Reserved.
          </p>
          <div className="flex gap-5">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
