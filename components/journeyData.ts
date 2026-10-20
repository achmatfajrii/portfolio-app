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
    role: "Programmer",
    company: "PT Arkatama Multi Solusindo",
    description:
      "Started my professional journey as a Programmer intern in Malang, collaborating with a development team to build, test, and maintain web applications. This experience introduced me to real-world software development workflows and established my foundation in programming.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },

  {
    year: "2023",
    title: "Building a Full-Stack Foundation",
    role: "Diploma in Informatics Engineering & Full-Stack Training",
    company: "Universitas Sebelas Maret · Harisenin.com",
    description:
      "Completed my Diploma in Informatics Engineering at Universitas Sebelas Maret with a GPA of 3.73/4.00 and strengthened my development skills through Harisenin's Full-Stack Developer Bootcamp. I explored modern frontend development, backend services, and database integration while building a team-based game voucher platform.",
    technologies: [
      "JavaScript",
      "React.js",
      "Node.js",
      "HTML",
      "CSS",
      "MySQL",
    ],
  },

  {
    year: "2023",
    title: "Expanding My Frontend Experience",
    role: "Front End Developer",
    company: "PT Koneksi Karya Indonesia · RSUD dr. R. Soedarsono",
    description:
      "Expanded my practical experience in frontend development, from translating UI/UX designs into functional interfaces to maintaining Electronic Medical Record applications. I also contributed to system integrations, usability improvements, and application performance while collaborating with cross-functional teams.",
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "React.js",
      "Vue.js",
    ],
  },

  {
    year: "2023",
    title: "Growing into Full-Stack Development",
    role: "Full-Stack Developer",
    company: "PT Elnusa Fabrikasi Konstruksi",
    description:
      "Joined Elnusa Fabrikasi Konstruksi as a Full-Stack Developer, contributing to enterprise applications across procurement, vendor management, OCTG, and payment systems. My responsibilities include developing features, debugging and optimizing code, maintaining application stability, and translating business requirements into practical technical solutions.",
    technologies: [
      "Vue.js",
      "React.js",
      "Node.js",
      "MySQL",
      "PostgreSQL",
    ],
  },

  {
    year: "2026",
    title: "Building Beyond the Frontend",
    role: "Full-Stack Developer",
    company: "PT Elnusa Fabrikasi Konstruksi",
    current: true,
    description:
      "Continuing to develop and maintain enterprise web applications while deepening my expertise across the full development lifecycle. Beyond delivering features, I focus on code quality, performance, maintainability, and solving complex business problems while exploring modern technologies such as Next.js and TypeScript through personal projects.",
    technologies: [
      "Vue.js",
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
    ],
  },
];