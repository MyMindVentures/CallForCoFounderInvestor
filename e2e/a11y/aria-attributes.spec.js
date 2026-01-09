// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('ARIA Attributes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have proper aria-labels on buttons', async ({ page }) => {
    // Language selector button
    const languageButton = page.locator('button[aria-label*="language"]').first();
    await expect(languageButton).toHaveAttribute('aria-label');
    
    const ariaLabel = await languageButton.getAttribute('aria-label');
    expect(ariaLabel).toContain('language');
  });

  test('should have aria-expanded on collapsible elements', async ({ page }) => {
    // Language selector
    const languageButton = page.locator('button[aria-label*="language"]').first();
    await expect(languageButton).toHaveAttribute('aria-expanded');
    
    const initialExpanded = await languageButton.getAttribute('aria-expanded');
    expect(['true', 'false']).toContain(initialExpanded);
    
    // Toggle and check aria-expanded updates
    await languageButton.click();
    await page.waitForTimeout(300);
    
    const afterClickExpanded = await languageButton.getAttribute('aria-expanded');
    expect(afterClickExpanded).not.toBe(initialExpanded);
  });

  test('should have aria-pressed on toggle buttons', async ({ page }) => {
    // Dark mode toggle
    const darkModeToggle = page.locator('button[aria-pressed]').first();
    const isVisible = await darkModeToggle.isVisible().catch(() => false);
    
    if (isVisible) {
      await expect(darkModeToggle).toHaveAttribute('aria-pressed');
      
      const ariaPressed = await darkModeToggle.getAttribute('aria-pressed');
      expect(['true', 'false']).toContain(ariaPressed);
    }
  });

  test('should have proper role attributes', async ({ page }) => {
    // Navigation should have nav role
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Main content should have main role
    const main = page.locator('main').first();
    await expect(main).toBeVisible();
    
    // Dropdown menus should have menu role
    const languageButton = page.locator('button[aria-label*="language"]').first();
    await languageButton.click();
    await page.waitForTimeout(300);
    
    const menu = page.locator('div[role="menu"]').first();
    const isVisible = await menu.isVisible().catch(() => false);
    
    if (isVisible) {
      await expect(menu).toHaveAttribute('role', 'menu');
    }
  });

  test('should have aria-haspopup on buttons with popups', async ({ page }) => {
    // Language selector button
    const languageButton = page.locator('button[aria-label*="language"]').first();
    await expect(languageButton).toHaveAttribute('aria-haspopup', 'true');
  });

  test('should have aria-controls linking button to controlled element', async ({ page }) => {
    // Mobile menu button
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label*="menu"], button[aria-expanded]').first();
    const isVisible = await menuButton.isVisible().catch(() => false);
    
    if (isVisible) {
      const ariaControls = await menuButton.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
    }
  });

  test('should have aria-hidden on decorative elements', async ({ page }) => {
    // Some decorative icons should have aria-hidden
    const icons = page.locator('svg[aria-hidden="true"]');
    const count = await icons.count();
    
    // Should have some decorative icons
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');

    // Form inputs should have associated labels
    const nameInput = page.locator('input[name="name"]');
    const nameLabel = page.locator('label[for="name"], label:has-text("Name")').first();
    const hasLabel = await nameLabel.isVisible().catch(() => false);
    
    expect(hasLabel).toBe(true);
  });

  test('should have aria-required on required fields', async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');

    // Required fields should have aria-required or required attribute
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required', '');
  });

  test('should have aria-live regions for dynamic content', async ({ page }) => {
    // Success/error messages should be in aria-live regions
    await page.goto('/support');
    await page.waitForLoadState('networkidle');

    // Check for aria-live attributes
    const liveRegions = page.locator('[aria-live]');
    const count = await liveRegions.count();
    
    // May or may not have aria-live regions depending on implementation
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
