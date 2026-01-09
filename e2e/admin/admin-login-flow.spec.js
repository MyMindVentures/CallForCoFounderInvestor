// @ts-check
const { test, expect } = require('@playwright/test');
const { loginAsAdmin, isAuthenticated, logout } = require('../utils/auth-helpers');
const { adminCredentials } = require('../utils/test-data');

test.describe('Admin Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to login page', async ({ page }) => {
    await expect(page).toHaveURL('/admin/login');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display login form elements', async ({ page }) => {
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(usernameInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('required', '');
    
    // Try to submit empty form
    await submitButton.click();
    
    // Form should not submit (HTML5 validation)
    await expect(page).toHaveURL('/admin/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/admin/dashboard');
    
    // Token should be stored
    const isAuth = await isAuthenticated(page);
    expect(isAuth).toBe(true);
  });

  test('should show error on failed login', async ({ page }) => {
    // Intercept API call to return error
    await page.route('/api/auth/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid credentials' }),
      });
    });

    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await usernameInput.fill('wrong');
    await passwordInput.fill('wrong');
    await submitButton.click();

    // Wait for error message
    await expect(page.locator('text=Invalid credentials, text=Login failed')).toBeVisible({ timeout: 5000 });
    
    // Should still be on login page
    await expect(page).toHaveURL('/admin/login');
  });

  test('should store token in localStorage after successful login', async ({ page }) => {
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    
    const token = await page.evaluate(() => localStorage.getItem('adminToken'));
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('should store username in localStorage after successful login', async ({ page }) => {
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    
    const username = await page.evaluate(() => localStorage.getItem('adminUsername'));
    expect(username).toBeTruthy();
    expect(username).toBe(adminCredentials.username);
  });

  test('should redirect to dashboard after successful login', async ({ page }) => {
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    
    await expect(page).toHaveURL('/admin/dashboard');
    await expect(page.locator('text=Admin Dashboard, h1')).toBeVisible({ timeout: 5000 });
  });

  test('should show loading state during login', async ({ page }) => {
    // Intercept API call with delay
    await page.route('/api/auth/login', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'test-token', username: adminCredentials.username }),
      });
    });

    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await usernameInput.fill(adminCredentials.username);
    await passwordInput.fill(adminCredentials.password);
    await submitButton.click();

    // Check for loading state
    await expect(page.locator('text=Logging in...')).toBeVisible();
    await expect(submitButton).toBeDisabled();
  });

  test('should redirect to login when accessing protected route without token', async ({ page }) => {
    // Clear any existing tokens
    await logout(page);
    
    // Try to access dashboard
    await page.goto('/admin/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL('/admin/login');
  });

  test('should allow navigation back to landing page', async ({ page }) => {
    const homeLink = page.locator('a[href="/"]').first();
    await homeLink.click();
    
    await expect(page).toHaveURL('/');
  });
});
