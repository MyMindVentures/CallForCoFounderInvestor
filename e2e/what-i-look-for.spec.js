// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('What I Look For Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/what-i-look-for');
  });

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveURL('/what-i-look-for');
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
    await page.route('/api/content/whatILookFor', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          pageId: 'whatILookFor',
          content: '<h1>What I Look For</h1><p>Content about what I am looking for.</p>',
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

  test('should display content sections', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Content sections should be visible
    const sections = page.locator('main h1, main h2, main section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have interactive elements', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Interactive elements (buttons, links) may be present
    const interactiveElements = page.locator('button, a[href]');
    const count = await interactiveElements.count();
    expect(count).toBeGreaterThan(0);
  });
});
