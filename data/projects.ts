export type ProjectLink = {
  label: string;
  href: string;
  variant?: "dark" | "apple" | "play";
};

export type Project = {
  name: string;
  stack: string;
  image: string;
  summary: string;
  links: ProjectLink[];
};

export const projects = {
  eyebrow: "Live Projects",
  title: "Published Systems,",
  titleAccent: "Real Users",
  intro:
    "A concise snapshot of shipped products across AI, health, finance, community, games, and wellness — each built with practical product engineering and production constraints in mind.",
  items: [
    {
      name: "Aury AI",
      stack: "AI companion • Flutter • NodeJS",
      image: "/images/team/team_2_6.jpg",
      summary: "An AI-powered support experience focused on accessible, structured conversations for wellness use cases.",
      links: [{ label: "Website", href: "https://aury.co/", variant: "dark" }],
    },
    {
      name: "Henry Meds",
      stack: "Healthcare • React • Flutter",
      image: "/images/team/team_2_1.jpg",
      summary: "A production healthcare flow connecting modern web UX, mobile delivery, and patient-facing digital operations.",
      links: [
        {
          label: "Website",
          href: "https://app.henrymeds.com/",
          variant: "dark",
        },
      ],
    },
    {
      name: "iConnections",
      stack: "Finance • Events • Mobile",
      image: "/images/team/team_2_2.jpg",
      summary: "A cross-platform finance and networking mobile app for investor events, meetings, and private market workflows.",
      links: [
        {
          label: "Apple Store",
          href: "https://apps.apple.com/us/app/iconnections-llc/id1534676334",
          variant: "apple",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=io.iconnections.mobile",
          variant: "play",
        },
      ],
    },
    {
      name: "Soul Games Studios",
      stack: "Unity • Web • Mobile",
      image: "/images/team/team_2_3.jpg",
      summary: "A game studio presence and product ecosystem spanning playful interactive experiences and web delivery.",
      links: [
        {
          label: "Website",
          href: "https://soulgamesstudios.com/",
          variant: "dark",
        },
      ],
    },
    {
      name: "Meditation Experience",
      stack: "Wellness • Mobile App",
      image: "/images/team/team_2_4.jpg",
      summary: "A wellness-focused mobile app designed around calming experiences, repeat engagement, and simple access.",
      links: [
        {
          label: "Apple Store",
          href: "https://apps.apple.com/us/app/meditation-experience/id1399192121",
          variant: "apple",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.scottalanwilliams.meditationexperience",
          variant: "play",
        },
      ],
    },
  ] satisfies Project[],
} as const;
