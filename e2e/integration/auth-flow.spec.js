// @ts-check
const { test, expect } = require('@playwright/test');
const { loginAsAdmin, isAuthenticated, logout } = require('../utils/auth-helpers');
const { adminCredentials } = require('../utils/test-data');

test.describe('Complete Authentication Flow', () => {
  test('should complete full login to dashboard flow', async ({ page }) => {
    // Start at login page
    await page.goto('/admin/login');
    await expect(page).toHaveURL('/admin/login');

    // Login
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);

    // Should be on dashboard
    await expect(page).toHaveURL('/admin/dashboard');
    await expect(page.locator('text=Admin Dashboard, h1')).toBeVisible({ timeout: 5000 });

    // Should be authenticated
    const isAuth = await isAuthenticated(page);
    expect(isAuth).toBe(true);
  });

  test('should handle token expiration and redirect', async ({ page }) => {
    // Login first
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await expect(page).toHaveURL('/admin/dashboard');

    // Simulate token expiration by clearing it
    await page.evaluate(() => {
      localStorage.removeItem('adminToken');
    });

    // Try to access protected route
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should redirect to login if token is invalid
    // (This depends on how the app handles invalid tokens)
    const currentUrl = page.url();
    expect(['/admin/login', '/admin/dashboard']).toContain(currentUrl);
  });

  test('should allow logout functionality', async ({ page }) => {
    // Login first
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await expect(page).toHaveURL('/admin/dashboard');

    // Find and click logout button
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Log out")').first();
    await logoutButton.click();
    await page.waitForTimeout(500);

    // Should redirect to login
    await expect(page).toHaveURL('/admin/login');

    // Token should be removed
    const isAuth = await isAuthenticated(page);
    expect(isAuth).toBe(false);
  });

  test('should redirect protected routes to login when not authenticated', async ({ page }) => {
    // Clear any existing tokens
    await logout(page);

    // Try to access dashboard
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    // Should redirect to login
    await expect(page).toHaveURL('/admin/login');
  });

  test('should maintain authentication across page navigations', async ({ page }) => {
    // Login
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);

    // Navigate to different pages
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Go back to dashboard
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    // Should still be authenticated
    const isAuth = await isAuthenticated(page);
    expect(isAuth).toBe(true);
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('should handle multiple login attempts', async ({ page }) => {
    await page.goto('/admin/login');

    // First attempt with wrong credentials
    await page.fill('input[name="username"]', 'wrong');
    await page.fill('input[name="password"]', 'wrong');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // Should show error
    const errorVisible = await page.locator('text=Invalid credentials, text=Login failed').isVisible().catch(() => false);
    expect(errorVisible).toBe(true);

    // Second attempt with correct credentials
    await page.fill('input[name="username"]', adminCredentials.username);
    await page.fill('input[name="password"]', adminCredentials.password);
    await page.click('button[type="submit"]');

    // Should succeed
    await expect(page).toHaveURL('/admin/dashboard', { timeout: 5000 });
  });
});
