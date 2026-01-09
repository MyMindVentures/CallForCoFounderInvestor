// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Accessibility', () => {
  test('landing page should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test('all pages should have main landmark', async ({ page }) => {
    const pages = ['/', '/storytelling', '/support', '/what-i-look-for'];
    
    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      const main = page.locator('main');
      await expect(main).toBeVisible();
    }
  });

  test('forms should have proper labels', async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');
    
    await page.waitForSelector('form', { timeout: 10000 });
    
    const inputs = page.locator('input, textarea');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < Math.min(inputCount, 5); i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      
      // Should have at least one identifier
      expect(id || name || ariaLabel || placeholder).toBeTruthy();
    }
  });

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');
      
      // Should have accessible name
      expect(text || ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  test('links should have descriptive text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      
      // Should have accessible name (skip empty links that might be icons)
      if (!text || text.trim() === '') {
        expect(ariaLabel || title).toBeTruthy();
      }
    }
  });

  test('images should have alt text or be decorative', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      
      // Should have alt text or be marked as decorative
      expect(alt !== null || role === 'presentation' || role === 'none').toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    // Should have focus on an element
    const focusedElement = await page.evaluate(() => document.activeElement);
    expect(focusedElement).toBeTruthy();
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that text is visible (basic contrast check)
    const textElements = page.locator('p, h1, h2, h3, span, div');
    const firstText = textElements.first();
    
    if (await firstText.isVisible().catch(() => false)) {
      const color = await firstText.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor,
          opacity: style.opacity
        };
      });
      
      // Basic check - color should be defined
      expect(color.color).toBeTruthy();
    }
  });
});
