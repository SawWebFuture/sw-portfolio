export type ProjectLink = {
  label: string;
  href: string;
  variant?: "dark" | "apple" | "play";
};

export type Project = {
  name: string;
  stack: string;
  image: string;
  links: ProjectLink[];
};

export const projects = {
  eyebrow: "Live Projects",
  title: "Explore My",
  titleAccent: "Published Work",
  items: [
    {
      name: "Aury AI",
      stack: "Flutter • AI • NodeJS",
      image: "/images/team/team_2_6.jpg",
      links: [{ label: "Website", href: "https://aury.co/", variant: "dark" }],
    },
    {
      name: "Henry Meds",
      stack: "React • Flutter • Swift",
      image: "/images/team/team_2_1.jpg",
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
      stack: "Flutter • Finance • Mobile",
      image: "/images/team/team_2_2.jpg",
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
