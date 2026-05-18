const { test, expect } = require("@playwright/test");

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5501";

async function loginAdmin(page) {
  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/login.html`);

  await page.fill('input[name="email"]', "admin_test@hotmail.com");

  await page.fill('input[name="password"]', "123456");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/index\.html/);
}

test("admin puede entrar al panel de productos", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.click('[data-seccion="productos"]');

  await expect(page.locator("#adminTablaProductos")).toBeVisible();
});

test("filtro de productos activos funciona", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.click('[data-seccion="productos"]');

  await expect(page.locator("#filtroEstadoProducto")).toBeVisible();

  await page.selectOption("#filtroEstadoProducto", "1");

  await expect(page.locator("#adminTablaProductos")).toContainText("Activo");
});

test("filtro de productos inactivos funciona", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.click('[data-seccion="productos"]');

  await expect(page.locator("#filtroEstadoProducto")).toBeVisible();

  await page.selectOption("#filtroEstadoProducto", "0");

  await expect(page.locator("#adminTablaProductos")).toContainText(
    /Inactivo|No hay productos/,
  );
});

test("buscador de productos funciona", async ({ page }) => {
  await loginAdmin(page);

  await page.goto(`${FRONTEND_ORIGIN}/FrontEnd/pages/admin.html`);

  await page.locator(".admin-opcion").filter({ hasText: "Productos" }).click();

  await expect(page.locator("#buscarProducto")).toBeVisible();

  await page.fill("#buscarProducto", "iPhone");

  await expect(page.locator("#adminTablaProductos")).toContainText("iPhone");
});
