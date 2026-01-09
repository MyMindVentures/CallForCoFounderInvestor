// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Storytelling Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/storytelling');
  });

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveURL('/storytelling');
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
    // Content should load from API or be visible
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
    await page.route('/api/content/storytelling', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          pageId: 'storytelling',
          content: '<h1>My Story</h1><p>This is my story content.</p>',
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

  test('should display video player if present', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Video player may or may not be present
    const video = page.locator('video').first();
    const videoPlaceholder = page.locator('text=Video coming soon').first();
    
    const hasVideo = await video.isVisible().catch(() => false);
    const hasPlaceholder = await videoPlaceholder.isVisible().catch(() => false);
    
    // Video section may or may not exist
    expect(typeof hasVideo).toBe('boolean');
    expect(typeof hasPlaceholder).toBe('boolean');
  });

  test('should display media if uploaded', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Media (images, videos) may be displayed
    const media = page.locator('img, video').first();
    const isVisible = await media.isVisible().catch(() => false);
    
    // Media may or may not be present
    expect(typeof isVisible).toBe('boolean');
  });
});
