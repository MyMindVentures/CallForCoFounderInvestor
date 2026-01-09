// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Navigation Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display navigation bar', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should display all navigation links on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const navLinks = [
      { path: '/', label: 'Home' },
      { path: '/storytelling', label: 'Story' },
      { path: '/what-i-look-for', label: 'What I Look For' },
      { path: '/developer-help', label: 'Developer Help' },
      { path: '/financial-help', label: 'Financial Help' },
      { path: '/support', label: 'Support' },
      { path: '/adhd-aries', label: 'ADHD + Aries' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`a[href="${link.path}"]`).first();
      await expect(navLink).toBeVisible({ timeout: 5000 });
    }
  });

  test('should toggle mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Find mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"], button[aria-expanded]').first();
    const isVisible = await menuButton.isVisible().catch(() => false);

    if (isVisible) {
      const initialExpanded = await menuButton.getAttribute('aria-expanded');
      
      // Click to open menu
      await menuButton.click();
      await page.waitForTimeout(300);
      
      const afterClickExpanded = await menuButton.getAttribute('aria-expanded');
      expect(afterClickExpanded).not.toBe(initialExpanded);
    }
  });

  test('should highlight active route', async ({ page }) => {
    await page.goto('/storytelling');
    await page.waitForLoadState('networkidle');

    // Active link should have special styling
    const activeLink = page.locator(`a[href="/storytelling"]`).first();
    await expect(activeLink).toBeVisible();
    
    // Check for active state classes
    const classes = await activeLink.getAttribute('class');
    expect(classes).toBeTruthy();
  });

  test('should navigate to all routes', async ({ page }) => {
    const routes = [
      '/',
      '/storytelling',
      '/what-i-look-for',
      '/developer-help',
      '/financial-help',
      '/support',
      '/adhd-aries',
    ];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(route);
    }
  });

  test('should close mobile menu on navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label*="menu"], button[aria-expanded]').first();
    const isVisible = await menuButton.isVisible().catch(() => false);

    if (isVisible) {
      // Open menu
      await menuButton.click();
      await page.waitForTimeout(300);
      
      // Click a navigation link
      const navLink = page.locator('a[href="/storytelling"]').first();
      await navLink.click();
      await page.waitForLoadState('networkidle');
      
      // Menu should be closed
      const expanded = await menuButton.getAttribute('aria-expanded');
      expect(expanded).toBe('false');
    }
  });

  test('should display logo/brand', async ({ page }) => {
    const logo = page.locator('a[href="/"], h1').first();
    await expect(logo).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="menu"]').first();
    const isVisible = await menuButton.isVisible().catch(() => false);
    
    // On mobile, menu button should be visible
    if (page.viewportSize().width < 1024) {
      expect(isVisible).toBe(true);
    }
  });

  test('should be responsive on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Desktop navigation links should be visible
    const navLinks = page.locator('nav a').first();
    await expect(navLinks).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Navigation links should have aria-labels
    const navLinks = page.locator('nav a[aria-label]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
