// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Language Selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load - use domcontentloaded for faster, more reliable loading
    await page.waitForLoadState('domcontentloaded');
    // Wait for the language selector to be available
    await page.waitForSelector('button[aria-label*="Current language"]', { state: 'attached' });
  });

  test('should display language selector in status bar', async ({ page }) => {
    // Check if language selector button is visible - use first() to handle multiple instances
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    await expect(languageButton).toBeVisible();
    
    // Check if it shows a language code (EN or NL)
    const buttonText = await languageButton.textContent();
    expect(buttonText).toMatch(/EN|NL/);
  });

  test('should open dropdown when clicked', async ({ page }) => {
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    
    // Click to open dropdown
    await languageButton.click();
    
    // Wait for dropdown to appear
    await page.waitForTimeout(200);
    
    // Check if dropdown menu is visible
    const dropdown = page.locator('div[role="menu"]');
    await expect(dropdown).toBeVisible();
    
    // Check if both language options are present
    await expect(page.locator('button[role="menuitem"]:has-text("English")')).toBeVisible();
    await expect(page.locator('button[role="menuitem"]:has-text("Nederlands")')).toBeVisible();
  });

  test('should close dropdown when clicking outside', async ({ page }) => {
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    
    // Open dropdown
    await languageButton.click();
    await page.waitForTimeout(200);
    
    // Verify dropdown is open
    const dropdown = page.locator('div[role="menu"]');
    await expect(dropdown).toBeVisible();
    
    // Click outside (on the page body)
    await page.click('body', { position: { x: 0, y: 0 } });
    await page.waitForTimeout(200);
    
    // Verify dropdown is closed
    await expect(dropdown).not.toBeVisible();
  });

  test('should change language when selecting a different option', async ({ page }) => {
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    
    // Get initial language
    const initialText = await languageButton.textContent();
    const initialLanguage = initialText.includes('EN') ? 'EN' : 'NL';
    const targetLanguage = initialLanguage === 'EN' ? 'NL' : 'EN';
    
    // Open dropdown
    await languageButton.click();
    await page.waitForTimeout(200);
    
    // Click on the other language option
    const targetOption = page.locator(`button[role="menuitem"]:has-text("${targetLanguage === 'EN' ? 'English' : 'Nederlands'}")`);
    await targetOption.click();
    await page.waitForTimeout(200);
    
    // Verify language has changed
    const newText = await languageButton.textContent();
    expect(newText).toContain(targetLanguage);
    
    // Verify dropdown is closed
    const dropdown = page.locator('div[role="menu"]');
    await expect(dropdown).not.toBeVisible();
  });

  test('should persist language selection in localStorage', async ({ page, context }) => {
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    
    // Get initial language
    const initialText = await languageButton.textContent();
    const initialLanguage = initialText.includes('EN') ? 'EN' : 'NL';
    const targetLanguage = initialLanguage === 'EN' ? 'NL' : 'EN';
    
    // Change language
    await languageButton.click();
    await page.waitForTimeout(200);
    const targetOption = page.locator(`button[role="menuitem"]:has-text("${targetLanguage === 'EN' ? 'English' : 'Nederlands'}")`);
    await targetOption.click();
    await page.waitForTimeout(200);
    
    // Check localStorage
    const language = await page.evaluate(() => localStorage.getItem('language'));
    expect(language).toBe(targetLanguage);
    
    // Reload page and verify language persists
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const persistedButton = page.locator('button[aria-label*="Current language"]').first();
    const persistedText = await persistedButton.textContent();
    expect(persistedText).toContain(targetLanguage);
  });

  test('should update document lang attribute', async ({ page }) => {
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    
    // Get initial language
    const initialText = await languageButton.textContent();
    const initialLanguage = initialText.includes('EN') ? 'EN' : 'NL';
    const targetLanguage = initialLanguage === 'EN' ? 'NL' : 'EN';
    
    // Change language
    await languageButton.click();
    await page.waitForTimeout(200);
    const targetOption = page.locator(`button[role="menuitem"]:has-text("${targetLanguage === 'EN' ? 'English' : 'Nederlands'}")`);
    await targetOption.click();
    await page.waitForTimeout(200);
    
    // Check document lang attribute
    const langAttribute = await page.evaluate(() => document.documentElement.getAttribute('lang'));
    expect(langAttribute).toBe(targetLanguage.toLowerCase());
  });

  test('should show checkmark on selected language', async ({ page }) => {
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    
    // Get current language
    const initialText = await languageButton.textContent();
    const currentLanguage = initialText.includes('EN') ? 'EN' : 'NL';
    
    // Open dropdown
    await languageButton.click();
    await page.waitForTimeout(200);
    
    // Find the selected language option
    const selectedOption = page.locator(`button[role="menuitem"]:has-text("${currentLanguage === 'EN' ? 'English' : 'Nederlands'}")`);
    
    // Check if it has the checkmark
    const optionText = await selectedOption.textContent();
    expect(optionText).toContain('✓');
    
    // Check if it has the selected styling (bg-teal-500/20)
    const classes = await selectedOption.getAttribute('class');
    expect(classes).toContain('bg-teal-500/20');
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Use first() to handle multiple instances (desktop/mobile)
    const languageButton = page.locator('button[aria-label*="Current language"]').first();
    
    // Check aria attributes
    await expect(languageButton).toHaveAttribute('aria-expanded', 'false');
    await expect(languageButton).toHaveAttribute('aria-haspopup', 'true');
    
    // Open with Enter key
    await languageButton.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    
    await expect(languageButton).toHaveAttribute('aria-expanded', 'true');
    
    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    
    // Close with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    await expect(languageButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    
    // Expand mobile status bar - it should be visible on mobile
    const expandButton = page.locator('button:has-text("7-day window")');
    await expandButton.waitFor({ state: 'visible' });
    await expandButton.click();
    await page.waitForTimeout(500);
    
    // Find the visible language selector button using visible pseudo-selector
    const languageButton = page.locator('button[aria-label*="Current language"]:visible').first();
    
    await expect(languageButton).toBeVisible({ timeout: 5000 });
    
    // Test functionality
    await languageButton.click();
    await page.waitForTimeout(300);
    
    const dropdown = page.locator('div[role="menu"]');
    await expect(dropdown).toBeVisible();
  });
});
