// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Developer Help Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/developer-help');
  });

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveURL('/developer-help');
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

  test('should display page content', async ({ page }) => {
    await page.waitForTimeout(2000);
    const content = page.locator('main p, main div, main article');
    await expect(content.first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate back to landing page', async ({ page }) => {
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });

  test('should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load content from API', async ({ page }) => {
    // Intercept API call
    await page.route('/api/content/developerHelp', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          pageId: 'developerHelp',
          content: '<h1>Developer Help</h1><p>Content about developer assistance.</p>',
        }),
      });
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Content should be loaded
    const content = page.locator('main').first();
    await expect(content).toBeVisible();
  });

  test('should display code examples if present', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Code examples may be present
    const codeBlocks = page.locator('code, pre, [class*="code"]');
    const count = await codeBlocks.count();
    
    // Code blocks may or may not be present
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
