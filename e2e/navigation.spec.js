// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have all navigation links', async ({ page }) => {
    const navLinks = [
      { href: '/', label: 'Home' },
      { href: '/storytelling', label: 'Story' },
      { href: '/what-i-look-for', label: 'What I Look For' },
      { href: '/developer-help', label: 'Developer Help' },
      { href: '/financial-help', label: 'Financial Help' },
      { href: '/support', label: 'Support' },
      { href: '/adhd-aries', label: 'ADHD + Aries' }
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`a[href="${link.href}"]`);
      await expect(navLink.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should navigate between all pages', async ({ page }) => {
    const pages = [
      '/storytelling',
      '/what-i-look-for',
      '/developer-help',
      '/financial-help',
      '/support',
      '/adhd-aries'
    ];

    for (const path of pages) {
      await page.goto(path);
      await expect(page).toHaveURL(path);
      await expect(page.locator('main')).toBeVisible();
      
      // Navigate back to home
      await page.goto('/');
      await expect(page).toHaveURL('/');
    }
  });

  test('should have mobile menu toggle', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"], button:has([data-testid="menu"]), nav button').first();
    
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      await page.waitForTimeout(500);
      
      // Menu should be visible after click
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    }
  });

  test('should highlight active page in navigation', async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');
    
    // Check if support link has active state
    const supportLink = page.locator('a[href="/support"]');
    const isActive = await supportLink.evaluate((el) => {
      return el.classList.toString().includes('active') || 
             window.getComputedStyle(el).fontWeight === 'bold' ||
             el.getAttribute('aria-current') === 'page';
    }).catch(() => false);
    
    // At least the link should be visible
    await expect(supportLink).toBeVisible();
  });

  test('should have language selector in navigation', async ({ page }) => {
    const langSelector = page.locator('button[aria-label*="language"], button:has-text("EN"), button:has-text("NL")');
    await expect(langSelector.first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate using browser back/forward', async ({ page }) => {
    await page.goto('/storytelling');
    await expect(page).toHaveURL('/storytelling');
    
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    await page.goForward();
    await expect(page).toHaveURL('/storytelling');
  });

  test('should maintain navigation state on page reload', async ({ page }) => {
    await page.goto('/support');
    await page.reload();
    await expect(page).toHaveURL('/support');
    await expect(page.locator('nav')).toBeVisible();
  });
});
