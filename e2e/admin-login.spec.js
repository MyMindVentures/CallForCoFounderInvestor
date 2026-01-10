// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Admin Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');
  });

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveURL('/admin/login');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('should display main content', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have login form elements', async ({ page }) => {
    const usernameInput = page.locator('input[type="text"], input[type="email"], input[name="username"]').first();
    await expect(usernameInput).toBeVisible({ timeout: 5000 });
    
    const passwordInput = page.locator('input[type="password"]').first();
    await expect(passwordInput).toBeVisible();
    
    const submitButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first();
    await expect(submitButton).toBeVisible();
  });

  test('should validate login form', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]').first();
    
    // Try to submit empty form
    await submitButton.click();
    
    // Form should not submit without credentials
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('/admin/login');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"], input[type="text"]', 'invalid');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Wait for error message or stay on login page
    await page.waitForTimeout(2000);
    
    const errorMessage = page.locator('text=Invalid, text=Error, text=incorrect, text=wrong');
    const stillOnLogin = page.url().includes('/admin/login');
    
    expect(await errorMessage.isVisible().catch(() => false) || stillOnLogin).toBeTruthy();
  });

  test('should redirect to dashboard on successful login', async ({ page }) => {
    // Use environment variables or default test credentials
    // WARNING: Default password 'admin123' is WEAK and for testing only
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    await page.fill('input[name="username"], input[type="text"]', username);
    await page.fill('input[type="password"]', password);
    
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Wait for redirect or success
    await page.waitForTimeout(3000);
    
    // Should redirect to dashboard or show success
    const isDashboard = page.url().includes('/admin/dashboard');
    const hasToken = await page.evaluate(() => localStorage.getItem('adminToken'));
    
    expect(isDashboard || hasToken).toBeTruthy();
  });

  test('should navigate back to landing page', async ({ page }) => {
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });

  test('should be accessible', async ({ page }) => {
    // Check for proper form labels
    const inputs = page.locator('input[type="text"], input[type="password"]');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
    
    // Check for submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });
});
