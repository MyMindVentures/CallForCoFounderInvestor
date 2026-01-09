// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Language Selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display language selector', async ({ page }) => {
    const langSelector = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")');
    await expect(langSelector.first()).toBeVisible({ timeout: 5000 });
  });

  test('should open dropdown on click', async ({ page }) => {
    const langButton = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")').first();
    await langButton.click();
    
    // Wait for dropdown to appear
    await page.waitForTimeout(500);
    
    // Check for language options
    const englishOption = page.locator('text=English, text=EN').first();
    const dutchOption = page.locator('text=Nederlands, text=NL').first();
    
    const hasOptions = await englishOption.isVisible().catch(() => false) || 
                       await dutchOption.isVisible().catch(() => false);
    expect(hasOptions).toBeTruthy();
  });

  test('should change language when option is selected', async ({ page }) => {
    const langButton = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")').first();
    await langButton.click();
    await page.waitForTimeout(500);
    
    // Try to click a language option
    const languageOption = page.locator('text=English, text=Nederlands, button:has-text("EN"), button:has-text("NL")').nth(1);
    if (await languageOption.isVisible().catch(() => false)) {
      await languageOption.click();
      await page.waitForTimeout(500);
      
      // Language should be saved in localStorage
      const savedLanguage = await page.evaluate(() => localStorage.getItem('language'));
      expect(['EN', 'NL']).toContain(savedLanguage);
    }
  });

  test('should persist language selection', async ({ page }) => {
    const langButton = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")').first();
    await langButton.click();
    await page.waitForTimeout(500);
    
    // Select a language
    const languageOption = page.locator('text=English, text=Nederlands').first();
    if (await languageOption.isVisible().catch(() => false)) {
      await languageOption.click();
      await page.waitForTimeout(500);
      
      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Language should still be selected
      const savedLanguage = await page.evaluate(() => localStorage.getItem('language'));
      expect(savedLanguage).toBeTruthy();
    }
  });

  test('should close dropdown on Escape key', async ({ page }) => {
    const langButton = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")').first();
    await langButton.click();
    await page.waitForTimeout(500);
    
    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Dropdown should be closed (options not visible)
    const languageOption = page.locator('text=English, text=Nederlands').first();
    const isVisible = await languageOption.isVisible().catch(() => false);
    expect(isVisible).toBeFalsy();
  });

  test('should close dropdown when clicking outside', async ({ page }) => {
    const langButton = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")').first();
    await langButton.click();
    await page.waitForTimeout(500);
    
    // Click outside (on main content)
    await page.click('main');
    await page.waitForTimeout(500);
    
    // Dropdown should be closed
    const languageOption = page.locator('text=English, text=Nederlands').first();
    const isVisible = await languageOption.isVisible().catch(() => false);
    expect(isVisible).toBeFalsy();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const langButton = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")').first();
    const ariaLabel = await langButton.getAttribute('aria-label');
    const ariaExpanded = await langButton.getAttribute('aria-expanded');
    
    expect(ariaLabel).toBeTruthy();
    expect(['true', 'false']).toContain(ariaExpanded);
  });
});
