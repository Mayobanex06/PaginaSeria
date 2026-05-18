const { test, expect } = require("@playwright/test");

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5501";

test("tienda carga productos", async ({ page }) => {
  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/tienda.html`);

  await expect(page.locator("body")).toContainText("Samsung");
});

test("botones de carrito existen en productos", async ({ page }) => {
  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/tienda.html`);

  await expect(page.locator(".btn-carrito").first()).toBeVisible();
});
