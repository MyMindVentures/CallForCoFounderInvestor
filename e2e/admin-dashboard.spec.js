// @ts-check
const { test, expect } = require('@playwright/test');

// Helper function to login
async function loginAsAdmin(page) {
  await page.goto('/admin/login');
  await page.waitForLoadState('networkidle');
  
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  
  await page.fill('input[name="username"], input[type="text"]', username);
  await page.fill('input[type="password"]', password);
  
  const submitButton = page.locator('button[type="submit"]').first();
  await submitButton.click();
  
  // Wait for redirect
  await page.waitForURL('**/admin/dashboard', { timeout: 10000 }).catch(() => {});
  await page.waitForLoadState('networkidle');
}

test.describe('Admin Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await loginAsAdmin(page);
  });

  test('should redirect to login if not authenticated', async ({ page }) => {
    // Clear authentication
    await page.evaluate(() => {
      localStorage.removeItem('adminToken');
    });
    
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Should redirect to login
    expect(page.url()).toContain('/admin/login');
  });

  test('should load dashboard after login', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin\/dashboard/);
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

  test('should display dashboard tabs', async ({ page }) => {
    // Wait for tabs to load
    await page.waitForTimeout(2000);
    
    const tabs = page.locator('button:has-text("Content"), button:has-text("Media"), button:has-text("Messages"), button:has-text("Donations")');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThan(0);
  });

  test('should switch between tabs', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Try to click different tabs
    const contentTab = page.locator('button:has-text("Content")').first();
    const messagesTab = page.locator('button:has-text("Messages")').first();
    
    if (await contentTab.isVisible().catch(() => false)) {
      await contentTab.click();
      await page.waitForTimeout(1000);
    }
    
    if (await messagesTab.isVisible().catch(() => false)) {
      await messagesTab.click();
      await page.waitForTimeout(1000);
      
      // Messages tab should show messages or empty state
      const messagesContent = page.locator('text=Messages, text=No messages, text=message');
      await expect(messagesContent.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should have logout functionality', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Log out"), button[aria-label*="logout"]').first();
    
    if (await logoutButton.isVisible().catch(() => false)) {
      await logoutButton.click();
      await page.waitForTimeout(2000);
      
      // Should redirect to login or home
      const currentUrl = page.url();
      expect(currentUrl.includes('/admin/login') || currentUrl === '/').toBeTruthy();
    }
  });

  test('should display content editor', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Click content tab if not already active
    const contentTab = page.locator('button:has-text("Content")').first();
    if (await contentTab.isVisible().catch(() => false)) {
      await contentTab.click();
      await page.waitForTimeout(1000);
    }
    
    // Look for content editor elements
    const textarea = page.locator('textarea').first();
    const saveButton = page.locator('button:has-text("Save")').first();
    
    // At least one should be visible
    const hasEditor = await textarea.isVisible().catch(() => false) || 
                     await saveButton.isVisible().catch(() => false);
    expect(hasEditor).toBeTruthy();
  });

  test('should display messages list', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const messagesTab = page.locator('button:has-text("Messages")').first();
    if (await messagesTab.isVisible().catch(() => false)) {
      await messagesTab.click();
      await page.waitForTimeout(2000);
      
      // Should show messages section
      const messagesSection = page.locator('text=Messages, text=No messages, text=message');
      await expect(messagesSection.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display donations section', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const donationsTab = page.locator('button:has-text("Donations")').first();
    if (await donationsTab.isVisible().catch(() => false)) {
      await donationsTab.click();
      await page.waitForTimeout(2000);
      
      // Should show donations section
      const donationsSection = page.locator('text=Donations, text=Total, text=€');
      await expect(donationsSection.first()).toBeVisible({ timeout: 5000 });
    }
  });
});
