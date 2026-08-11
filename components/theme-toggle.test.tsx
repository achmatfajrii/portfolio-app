import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./theme-toggle";
import { useThemeStore } from "@/lib/store/theme-store";

describe("ThemeToggle", () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: "dark" });
  });

  it("render tombol toggle theme", () => {
    render(<ThemeToggle />);
    expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
  });

  it("toggle tema dari dark ke light saat diklik", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByLabelText(/toggle theme/i));
    expect(useThemeStore.getState().theme).toBe("light");
  });
});