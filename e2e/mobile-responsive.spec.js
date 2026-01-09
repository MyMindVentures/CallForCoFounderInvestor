// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Mobile Responsiveness', () => {
  const mobileViewport = { width: 375, height: 667 }; // iPhone SE
  const tabletViewport = { width: 768, height: 1024 }; // iPad
  const desktopViewport = { width: 1920, height: 1080 };

  test('landing page should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Content should not overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = mobileViewport.width;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small margin
  });

  test('navigation should work on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for mobile menu
    const menuButton = page.locator('button[aria-label*="menu"], nav button').first();
    
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      await page.waitForTimeout(500);
      await expect(page.locator('nav')).toBeVisible();
    }
  });

  test('support page form should be usable on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/support');
    await page.waitForLoadState('networkidle');
    
    await page.waitForSelector('form', { timeout: 10000 });
    
    const nameInput = page.locator('input[name="name"]').first();
    await expect(nameInput).toBeVisible();
    
    // Input should be tappable
    await nameInput.click();
    await nameInput.fill('Test User');
    
    const value = await nameInput.inputValue();
    expect(value).toBe('Test User');
  });

  test('all pages should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize(tabletViewport);
    
    const pages = ['/', '/storytelling', '/support', '/what-i-look-for'];
    
    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('main')).toBeVisible();
      
      // Check for horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll).toBe(false);
    }
  });

  test('text should be readable on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that text elements have reasonable font size
    const textElement = page.locator('p, h1, h2').first();
    if (await textElement.isVisible().catch(() => false)) {
      const fontSize = await textElement.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });
      
      // Font should be at least 12px for readability
      expect(fontSize).toBeGreaterThanOrEqual(12);
    }
  });

  test('buttons should be tappable on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/support');
    await page.waitForLoadState('networkidle');
    
    await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
    
    const submitButton = page.locator('button[type="submit"]').first();
    const box = await submitButton.boundingBox();
    
    // Button should be at least 44x44px for touch targets
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should handle orientation change', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Change to landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(500);
    
    await expect(page.locator('main')).toBeVisible();
    
    // Change back to portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    await expect(page.locator('main')).toBeVisible();
  });
});
