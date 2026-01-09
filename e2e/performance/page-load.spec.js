// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Page Load Performance', () => {
  test('should load landing page within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have fast Time to Interactive', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');
    
    // Check if main content is visible
    await expect(page.locator('main')).toBeVisible({ timeout: 3000 });
  });

  test('should load all critical resources', async ({ page }) => {
    const resources = [];
    
    page.on('response', (response) => {
      resources.push({
        url: response.url(),
        status: response.status(),
      });
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that all resources loaded successfully
    const failedResources = resources.filter(r => r.status >= 400);
    expect(failedResources.length).toBe(0);
  });

  test('should optimize network requests', async ({ page }) => {
    const requests = [];
    
    page.on('request', (request) => {
      requests.push({
        url: request.url(),
        method: request.method(),
      });
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should not have excessive duplicate requests
    const uniqueUrls = new Set(requests.map(r => r.url));
    const duplicateRatio = requests.length / uniqueUrls.size;
    
    // Duplicate ratio should be reasonable (some duplicates are expected for assets)
    expect(duplicateRatio).toBeLessThan(3);
  });

  test('should load pages efficiently', async ({ page }) => {
    const pages = [
      '/',
      '/storytelling',
      '/what-i-look-for',
      '/developer-help',
      '/financial-help',
      '/support',
    ];

    for (const route of pages) {
      const startTime = Date.now();
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Each page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    }
  });
});
