const { test, expect } = require("@playwright/test");

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5501";

test("login admin exitoso redirige al inicio", async ({ page }) => {
  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/login.html`);

  await page.fill('input[name="email"]', "admin_test@hotmail.com");
  await page.fill('input[name="password"]', "12345678");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/index\.html/);
});

test("login inválido no permite acceso", async ({ page }) => {
  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/login.html`);

  await page.fill('input[name="email"]', "correo_falso@test.com");
  await page.fill('input[name="password"]', "claveincorrecta");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/login\.html/);
});
