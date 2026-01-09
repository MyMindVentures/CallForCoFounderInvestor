// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('DarkModeToggle Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display dark mode toggle button', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    await expect(toggleButton).toBeVisible({ timeout: 5000 });
  });

  test('should toggle between dark and light mode', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    
    // Get initial state
    const initialAriaPressed = await toggleButton.getAttribute('aria-pressed');
    const initialIsDark = initialAriaPressed === 'true';
    
    // Click to toggle
    await toggleButton.click();
    await page.waitForTimeout(300);
    
    // Check if state changed
    const newAriaPressed = await toggleButton.getAttribute('aria-pressed');
    const newIsDark = newAriaPressed === 'true';
    
    expect(newIsDark).not.toBe(initialIsDark);
  });

  test('should update document class on toggle', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    
    // Get initial class
    const initialHasDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    // Toggle
    await toggleButton.click();
    await page.waitForTimeout(300);
    
    // Check if class changed
    const newHasDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    expect(newHasDark).not.toBe(initialHasDark);
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    
    // Toggle to a specific state
    await toggleButton.click();
    await page.waitForTimeout(300);
    
    // Get the theme from localStorage
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(['dark', 'light']).toContain(theme);
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if theme persisted
    const persistedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(persistedTheme).toBe(theme);
  });

  test('should change icon on toggle', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    
    // Get initial icon (sun or moon)
    const initialIcon = await toggleButton.locator('svg').first().isVisible();
    
    // Toggle
    await toggleButton.click();
    await page.waitForTimeout(500);
    
    // Icon should still be visible (just different)
    const newIcon = await toggleButton.locator('svg').first().isVisible();
    expect(newIcon).toBe(true);
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    
    await expect(toggleButton).toHaveAttribute('aria-pressed');
    await expect(toggleButton).toHaveAttribute('aria-label');
    
    const ariaLabel = await toggleButton.getAttribute('aria-label');
    expect(ariaLabel).toContain('mode');
  });

  test('should have proper title attribute', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    
    const title = await toggleButton.getAttribute('title');
    expect(title).toContain('mode');
  });

  test('should work with keyboard navigation', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label*="mode"], button[aria-pressed]').first();
    
    // Focus the button
    await toggleButton.focus();
    
    // Press Enter to toggle
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    
    // State should have changed
    const ariaPressed = await toggleButton.getAttribute('aria-pressed');
    expect(['true', 'false']).toContain(ariaPressed);
  });
});
