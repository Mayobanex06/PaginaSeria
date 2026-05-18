const { test, expect } = require("@playwright/test");

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5501";

async function loginUsuario(page) {
  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/login.html`);

  await page.fill('input[name="email"]', "user_test@hotmail.com");
  await page.fill('input[name="password"]', "123456");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/index\.html/);
}

test("carrito muestra resumen de compra", async ({ page }) => {
  await loginUsuario(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/carrito.html`);

  await expect(page.locator("body")).toContainText("Resumen de compra");
  await expect(page.locator("body")).toContainText("Total");
});
