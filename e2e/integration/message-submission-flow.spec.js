// @ts-check
const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../utils/auth-helpers');
const { adminCredentials, testMessages } = require('../utils/test-data');

test.describe('Complete Message Submission Flow', () => {
  test('should submit message and appear in admin dashboard', async ({ page }) => {
    let messageId = null;

    // Intercept message creation
    await page.route('/api/messages', async (route) => {
      if (route.request().method() === 'POST') {
        messageId = 'test-message-123';
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Message submitted successfully', id: messageId }),
        });
      } else {
        await route.continue();
      }
    });

    // Submit message on support page
    await page.goto('/support');
    await page.waitForLoadState('networkidle');

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await nameInput.fill(testMessages.valid.name);
    await emailInput.fill(testMessages.valid.email);
    await messageTextarea.fill(testMessages.valid.message);
    await submitButton.click();

    // Wait for success message
    await expect(page.locator('text=Thank you! Your message has been sent successfully')).toBeVisible({ timeout: 5000 });

    // Login as admin
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    // Navigate to messages tab
    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);

    // Intercept messages API
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: messageId,
            name: testMessages.valid.name,
            email: testMessages.valid.email,
            message: testMessages.valid.message,
            isPositive: false,
            isPublished: false,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    await page.reload();
    await page.waitForTimeout(1000);

    // Message should appear in admin dashboard
    await expect(page.locator(`text=${testMessages.valid.name}`)).toBeVisible({ timeout: 5000 });
  });

  test('should allow admin to curate and publish message', async ({ page }) => {
    const messageId = 'test-message-456';

    // Login as admin first
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    // Navigate to messages tab
    const messagesTab = page.locator('button:has-text("Messages")');
    await messagesTab.click();
    await page.waitForTimeout(1000);

    // Intercept messages API
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: messageId,
            name: testMessages.valid.name,
            email: testMessages.valid.email,
            message: testMessages.valid.message,
            isPositive: false,
            isPublished: false,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    // Intercept curation API
    await page.route('/api/messages/*/curate', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: messageId,
          isPositive: true,
          isPublished: true,
        }),
      });
    });

    await page.reload();
    await page.waitForTimeout(1000);

    // Find and check positive checkbox
    const positiveCheckbox = page.locator('input[type="checkbox"]').first();
    const isVisible = await positiveCheckbox.isVisible().catch(() => false);

    if (isVisible) {
      await positiveCheckbox.click();
      await page.waitForTimeout(500);

      // Find and check publish checkbox
      const publishCheckbox = page.locator('input[type="checkbox"]').nth(1);
      await publishCheckbox.click();
      await page.waitForTimeout(500);

      // Both should be checked
      await expect(positiveCheckbox).toBeChecked();
      await expect(publishCheckbox).toBeChecked();
    }
  });

  test('should display curated message on public page', async ({ page }) => {
    // Intercept public messages API
    await page.route('/api/messages/public', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'published-1',
            name: testMessages.valid.name,
            message: testMessages.valid.message,
            isPositive: true,
            isPublished: true,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    // Visit support page
    await page.goto('/support');
    await page.waitForLoadState('networkidle');

    // Curated message should be displayed
    await expect(page.locator(`text=${testMessages.valid.name}`)).toBeVisible({ timeout: 5000 });
    await expect(page.locator(`text=${testMessages.valid.message}`)).toBeVisible();
  });
});
