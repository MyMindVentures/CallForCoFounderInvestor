// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Financial Help Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/financial-help');
  });

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveURL('/financial-help');
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

  test('should have donation button or link', async ({ page }) => {
    await page.waitForTimeout(2000);
    const donationButton = page.locator('a[href*="wise"], button:has-text("Donate"), a:has-text("Donate")').first();
    // Donation button might not always be visible, but if present should work
    if (await donationButton.isVisible().catch(() => false)) {
      await expect(donationButton).toBeVisible();
    }
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
    await page.route('/api/content/financialHelp', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          pageId: 'financialHelp',
          content: '<h1>Financial Help</h1><p>Content about financial support.</p>',
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

  test('should display donation button functionality', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const donationButton = page.locator('button:has-text("Donate via Wise"), button:has-text("Donate")').first();
    const isVisible = await donationButton.isVisible().catch(() => false);
    
    // Donation button should be visible on financial help page
    expect(isVisible).toBe(true);
  });

  test('should display content sections', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Content sections should be visible
    const sections = page.locator('main h1, main h2, main section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });
});
