import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  it("menampilkan judul, deskripsi, dan tech badge", () => {
    render(
      <ProjectCard
        title="Contoh Proyek"
        description="Deskripsi singkat"
        tech={["React", "Node.js"]}
      />
    );
    expect(screen.getByText("Contoh Proyek")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi singkat")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});