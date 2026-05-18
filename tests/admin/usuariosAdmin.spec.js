const { test, expect } = require("@playwright/test");

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5501";

async function loginAdmin(page) {
  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/login.html`);

  await page.fill('input[name="email"]', "admin_test@hotmail.com");

  await page.fill('input[name="password"]', "123456");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/index\.html/);
}

test("admin puede entrar al panel de usuarios", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.click('[data-seccion="usuarios"]');

  await expect(page.locator("#adminTablaUsuarios")).toBeVisible();
});

test("filtro de usuarios activos funciona", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.click('[data-seccion="usuarios"]');

  await expect(page.locator("#filtroEstadoUsuario")).toBeVisible();

  await page.selectOption("#filtroEstadoUsuario", "1");

  await expect(page.locator("#adminTablaUsuarios")).toContainText("Activo");
});

test("filtro de usuarios inactivos funciona", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.click('[data-seccion="usuarios"]');

  await expect(page.locator("#filtroEstadoUsuario")).toBeVisible();

  await page.selectOption("#filtroEstadoUsuario", "0");

  await expect(page.locator("#adminTablaUsuarios")).toContainText(
    /Inactivo|No hay usuarios/,
  );
});

test("buscador de usuarios funciona", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.locator(".admin-opcion").filter({ hasText: "Usuarios" }).click();

  await expect(page.locator("#buscarUsuario")).toBeVisible();

  await page.fill("#buscarUsuario", "admin");

  await expect(page.locator("#adminTablaUsuarios")).toContainText("admin");
});
