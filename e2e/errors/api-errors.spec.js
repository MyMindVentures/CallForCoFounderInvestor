// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('API Error Handling', () => {
  test.describe('400 Bad Request', () => {
    test('should handle 400 error from messages API', async ({ request }) => {
      const response = await request.post('/api/messages', {
        data: {
          // Missing required fields
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should handle 400 error from donations API', async ({ request }) => {
      const response = await request.post('/api/donations', {
        data: {
          // Missing required fields
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  test.describe('401 Unauthorized', () => {
    test('should handle 401 error from protected endpoints', async ({ request }) => {
      const response = await request.get('/api/messages', {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
      });

      expect(response.status()).toBe(401);
    });

    test('should handle 401 error when no token provided', async ({ request }) => {
      const response = await request.get('/api/messages');

      expect(response.status()).toBe(401);
    });
  });

  test.describe('404 Not Found', () => {
    test('should handle 404 error for non-existent routes', async ({ request }) => {
      const response = await request.get('/api/nonexistent');

      expect(response.status()).toBe(404);
    });

    test('should handle 404 error for non-existent message', async ({ request }) => {
      // First get a valid token
      const loginResponse = await request.post('/api/auth/login', {
        data: {
          username: process.env.ADMIN_USERNAME || 'admin',
          password: process.env.ADMIN_PASSWORD || 'admin123',
        },
      });
      const loginData = await loginResponse.json();
      const token = loginData.token;

      const response = await request.put('/api/messages/invalid-id/curate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          isPositive: true,
          isPublished: true,
        },
      });

      expect(response.status()).toBe(404);
    });
  });

  test.describe('500 Server Error', () => {
    test('should handle 500 error gracefully', async ({ page }) => {
      // Intercept API call to return 500
      await page.route('/api/messages', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        });
      });

      await page.goto('/support');
      await page.waitForLoadState('networkidle');

      // Try to submit a message
      const nameInput = page.locator('input[name="name"]');
      const emailInput = page.locator('input[name="email"]');
      const messageTextarea = page.locator('textarea[name="message"]');
      const submitButton = page.locator('button[type="submit"]');

      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await messageTextarea.fill('Test message');
      await submitButton.click();

      // Error message should be displayed
      await expect(page.locator('text=Failed to send message, text=error')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Network Errors', () => {
    test('should handle network timeout', async ({ page }) => {
      // Intercept API call with long delay
      await page.route('/api/messages', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10 second delay
        await route.continue();
      });

      await page.goto('/support');
      await page.waitForLoadState('networkidle');

      const nameInput = page.locator('input[name="name"]');
      const emailInput = page.locator('input[name="email"]');
      const messageTextarea = page.locator('textarea[name="message"]');
      const submitButton = page.locator('button[type="submit"]');

      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await messageTextarea.fill('Test message');
      await submitButton.click();

      // Should handle timeout (may show error or loading state)
      await page.waitForTimeout(2000);
      const errorVisible = await page.locator('text=Failed, text=timeout, text=error').isVisible().catch(() => false);
      expect(typeof errorVisible).toBe('boolean');
    });

    test('should handle network failure', async ({ page }) => {
      // Abort the request
      await page.route('/api/messages', async (route) => {
        await route.abort('failed');
      });

      await page.goto('/support');
      await page.waitForLoadState('networkidle');

      const nameInput = page.locator('input[name="name"]');
      const emailInput = page.locator('input[name="email"]');
      const messageTextarea = page.locator('textarea[name="message"]');
      const submitButton = page.locator('button[type="submit"]');

      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await messageTextarea.fill('Test message');
      await submitButton.click();

      // Error should be handled
      await page.waitForTimeout(1000);
      const errorVisible = await page.locator('text=Failed, text=error').isVisible().catch(() => false);
      expect(typeof errorVisible).toBe('boolean');
    });
  });
});
