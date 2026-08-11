"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/lib/store/theme-store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}