const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal memuat data proyek dari API");
  return res.json();
}