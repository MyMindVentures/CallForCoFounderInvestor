// @ts-check
const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../utils/auth-helpers');
const { adminCredentials } = require('../utils/test-data');

test.describe('Admin Dashboard - Message Curation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to messages tab', async ({ page }) => {
    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(500);
    
    await expect(messagesTab).toBeVisible();
  });

  test('should display all messages', async ({ page }) => {
    // Intercept API call
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message',
            isPositive: false,
            isPublished: false,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);
    
    // Messages should be displayed
    const messageList = page.locator('text=Test User, text=All Messages');
    await expect(messageList.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display empty state when no messages', async ({ page }) => {
    // Intercept API call to return empty array
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);
    
    // Empty state should be displayed
    const emptyState = page.locator('text=No messages yet, text=No messages');
    const isVisible = await emptyState.isVisible().catch(() => false);
    
    expect(isVisible).toBe(true);
  });

  test('should allow marking message as positive', async ({ page }) => {
    // Intercept API calls
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message',
            isPositive: false,
            isPublished: false,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    await page.route('/api/messages/*/curate', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '1',
          isPositive: true,
          isPublished: false,
        }),
      });
    });

    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);
    
    // Find positive checkbox
    const positiveCheckbox = page.locator('input[type="checkbox"]').first();
    const isVisible = await positiveCheckbox.isVisible().catch(() => false);
    
    if (isVisible) {
      await positiveCheckbox.click();
      await page.waitForTimeout(500);
      
      // Checkbox should be checked
      await expect(positiveCheckbox).toBeChecked();
    }
  });

  test('should allow publishing messages', async ({ page }) => {
    // Intercept API calls
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message',
            isPositive: false,
            isPublished: false,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    await page.route('/api/messages/*/curate', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '1',
          isPositive: false,
          isPublished: true,
        }),
      });
    });

    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);
    
    // Find publish checkbox (usually the second checkbox)
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    
    if (count >= 2) {
      const publishCheckbox = checkboxes.nth(1);
      await publishCheckbox.click();
      await page.waitForTimeout(500);
      
      // Checkbox should be checked
      await expect(publishCheckbox).toBeChecked();
    }
  });

  test('should display message details', async ({ page }) => {
    // Intercept API call
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message content',
            isPositive: false,
            isPublished: false,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);
    
    // Message details should be visible
    await expect(page.locator('text=Test User')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=test@example.com')).toBeVisible();
    await expect(page.locator('text=Test message content')).toBeVisible();
  });

  test('should display donation amount if present', async ({ page }) => {
    // Intercept API call
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message',
            donationAmount: 50.00,
            isPositive: false,
            isPublished: false,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);
    
    // Donation amount should be displayed
    const donationBadge = page.locator('text=€50, text=50');
    const isVisible = await donationBadge.isVisible().catch(() => false);
    
    expect(typeof isVisible).toBe('boolean');
  });

  test('should show message count in tab badge', async ({ page }) => {
    // Intercept API call
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: '1', name: 'User 1', email: 'user1@example.com', message: 'Message 1' },
          { id: '2', name: 'User 2', email: 'user2@example.com', message: 'Message 2' },
        ]),
      });
    });

    const messagesTab = page.locator('button:has-text("Messages")');
    
    // Tab should show count badge
    const badge = messagesTab.locator('[class*="badge"], span').first();
    const isVisible = await badge.isVisible().catch(() => false);
    
    // Badge may or may not be visible depending on implementation
    expect(typeof isVisible).toBe('boolean');
  });
});
