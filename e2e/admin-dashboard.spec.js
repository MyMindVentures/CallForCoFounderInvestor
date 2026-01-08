// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Admin Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/dashboard');
  });

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('should have no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('should display main content', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have navigation visible', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should navigate back to landing page', async ({ page }) => {
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });
});
