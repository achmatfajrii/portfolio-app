import { test, expect } from "@playwright/test";

test("halaman utama menampilkan nama dan tagline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Achmat Fajri" })).toBeVisible();
});

test("klik 'View projects' scroll ke section Projects", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View projects" }).click();
  await expect(page.locator("#projects")).toBeInViewport();
});

test("toggle theme berfungsi", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);
  await page.getByLabel("Toggle theme").click();
  await expect(html).not.toHaveClass(/dark/);
});

test("section contact menampilkan tombol email dan GitHub", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: /email me/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /github/i }).first()).toBeVisible();
});