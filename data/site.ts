export const site = {
  name: "Scott Williams",
  title: "Scott Williams Portfolio",
  description:
    "Scott Williams — Senior Software Engineer specializing in mobile and web development with Flutter, SwiftUI, React, and modern backends.",
  role: "Senior Software Engineer – Mobile & Web",
  url: "https://scottalanwilliams.com",
  calendly: "https://calendly.com/scottalanw/30min",
  linkedin: "https://www.linkedin.com/in/sawwebfuture/",
  github: "https://github.com/SawWebFuture",
  instagram: "https://www.instagram.com/scott_alan_williams/",
  art: "https://kunsto.com/",
  flutterCourse: "https://www.youtube.com/watch?v=iJZLrRPONrs",
  skillsVideo: "https://www.youtube.com/watch?v=cf31oEJr8kU",
} as const;

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About Me", href: "#about-sec" },
  { label: "Services", href: "#service-sec" },
  { label: "Live Apps", href: "#live-sec" },
  { label: "Blog", href: "#blog-sec" },
  { label: "Contact Me", href: site.linkedin, external: true },
] as const;

export const socialLinks = [
  { label: "Instagram", href: site.instagram },
  { label: "Art", href: site.art },
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
] as const;

export const footerSkills = [
  "Flutter (Mobile & Web)",
  "Swift / SwiftUI (iOS)",
  "Kotlin (Android)",
  "Unity3D (Games)",
  "ReactJS / NextJS",
  "GraphQL / REST APIs",
  "Firebase / AWS",
  "Node.js / .NET",
  "GitHub / GitHub Actions",
] as const;

export const footerBio =
  "Helping businesses launch powerful mobile experiences from the palm of your hand. With over 12 years of Software Development using Flutter and native development, I turn complex ideas into sleek, high-performing apps across iOS, Android, and the web.";
