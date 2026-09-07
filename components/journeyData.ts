export interface JourneyItem {
  year: string;
  title: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  current?: boolean;
}

export const journeyData: JourneyItem[] = [
  {
    year: "2022",
    title: "The Beginning",
    role: "Programmer Intern",
    company: "PT Arkatama Multi Solusindo",
    description:
      "My first step into the professional world of software development. Through an internship program in Malang, I experienced how software is built and maintained within a real development team.",
    technologies: ["JavaScript", "Vue.js", "Node.js"],
  },

  {
    year: "2023",
    title: "Going Fullstack",
    role: "Fullstack Web Developer",
    company: "Harisenin.com",
    description:
      "I expanded my skills beyond the frontend and learned how to build complete web applications, from designing interfaces to developing backend services and working with databases.",
    technologies: ["React", "Node.js", "Express.js", "MySQL"],
  },

  {
    year: "2024",
    title: "Growing as a Frontend Developer",
    role: "Front End Developer",
    company: "Professional Experience",
    description:
      "I started focusing more deeply on frontend development, turning UI/UX designs into responsive and interactive web interfaces while working closely with backend developers.",
    technologies: ["React", "Vue.js", "Next.js", "Tailwind CSS"],
  },

  {
  year: "2026",
  title: "Where I Am Now",
  role: "Front End Developer",
  company: "Current Role",
  current: true,
  description:
    "Today, I'm building and maintaining enterprise web applications while continuing to grow as a developer. I'm particularly interested in creating clean interfaces and understanding the full journey behind a web application.",
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
}
];