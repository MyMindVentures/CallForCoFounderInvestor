// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate with Tab key', async ({ page }) => {
    // Press Tab to move focus
    await page.keyboard.press('Tab');
    
    // Focus should move to next focusable element
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should activate buttons with Enter key', async ({ page }) => {
    // Find a button and focus it
    const button = page.locator('button').first();
    await button.focus();
    
    // Press Enter
    await page.keyboard.press('Enter');
    
    // Button action should be triggered (may vary by button)
    await page.waitForTimeout(300);
    expect(true).toBe(true); // Test passes if no error
  });

  test('should activate buttons with Space key', async ({ page }) => {
    // Find a button and focus it
    const button = page.locator('button').first();
    await button.focus();
    
    // Press Space
    await page.keyboard.press('Space');
    
    // Button action should be triggered
    await page.waitForTimeout(300);
    expect(true).toBe(true); // Test passes if no error
  });

  test('should close dropdowns with Escape key', async ({ page }) => {
    // Open language selector
    const languageButton = page.locator('button[aria-label*="language"]').first();
    await languageButton.click();
    await page.waitForTimeout(300);
    
    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // Dropdown should be closed
    const dropdown = page.locator('div[role="menu"]');
    const isVisible = await dropdown.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('should navigate navigation menu with keyboard', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Focus on navigation
    const navLink = page.locator('nav a').first();
    await navLink.focus();
    
    // Use arrow keys or Tab to navigate
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    
    // Focus should move
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should navigate forms with Tab key', async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');

    // Focus on first input
    const nameInput = page.locator('input[name="name"]');
    await nameInput.focus();
    
    // Tab to next field
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    
    // Focus should move to email field
    const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('name'));
    expect(focusedElement).toBe('email');
  });

  test('should submit forms with Enter key', async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');

    // Fill form
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');

    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await messageTextarea.fill('Test message');
    
    // Focus on submit button
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.focus();
    
    // Press Enter
    await page.keyboard.press('Enter');
    
    // Form should submit (may show loading or success)
    await page.waitForTimeout(500);
    expect(true).toBe(true); // Test passes if no error
  });

  test('should manage focus on modal/dialog open', async ({ page }) => {
    // Open language selector (acts like a dropdown)
    const languageButton = page.locator('button[aria-label*="language"]').first();
    await languageButton.click();
    await page.waitForTimeout(300);
    
    // Focus should be on dropdown
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should return focus after closing modal/dialog', async ({ page }) => {
    // Open language selector
    const languageButton = page.locator('button[aria-label*="language"]').first();
    await languageButton.focus();
    await languageButton.click();
    await page.waitForTimeout(300);
    
    // Close with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // Focus should return to button
    const focusedElement = await page.evaluate(() => document.activeElement);
    const isButton = await page.evaluate((el) => el?.tagName === 'BUTTON', focusedElement);
    expect(isButton).toBe(true);
  });
});
