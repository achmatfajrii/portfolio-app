"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/lib/store/theme-store";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const label = mounted
    ? theme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={mounted ? theme === "dark" : undefined}
      title={label}
      className="
        inline-flex h-8 w-10 items-center justify-center
        rounded-xl border border-border
        bg-card text-muted-foreground
        shadow-sm transition-colors duration-200
        hover:bg-accent hover:text-accent-foreground
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
      "
    >
      <Sun
        aria-hidden="true"
        className="hidden h-4 w-4 dark:block"
      />

      <Moon
        aria-hidden="true"
        className="block h-4 w-4 dark:hidden"
      />
    </button>
  );
}