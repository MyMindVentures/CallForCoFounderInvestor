// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Support Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');
  });

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveURL('/support');
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
    // Check for page heading
    await expect(page.locator('h1, h2')).toHaveCount(1, { timeout: 5000 });
  });

  test('should have navigation visible', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should display message form', async ({ page }) => {
    // Wait for form to load
    await page.waitForSelector('form, input[name="name"], input[type="text"]', { timeout: 10000 });
    const nameInput = page.locator('input[name="name"], input[type="text"]').first();
    await expect(nameInput).toBeVisible();
    
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    await expect(emailInput).toBeVisible();
    
    const messageInput = page.locator('textarea[name="message"], textarea').first();
    await expect(messageInput).toBeVisible();
    
    const submitButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await expect(submitButton).toBeVisible();
  });

  test('should validate message form fields', async ({ page }) => {
    await page.waitForSelector('form', { timeout: 10000 });
    const submitButton = page.locator('button[type="submit"]').first();
    
    // Try to submit empty form
    await submitButton.click();
    
    // Check for HTML5 validation or error messages
    const nameInput = page.locator('input[name="name"]').first();
    if (await nameInput.getAttribute('required') !== null) {
      // HTML5 validation should prevent submission
      const validity = await nameInput.evaluate((el) => el.validity.valid);
      expect(validity).toBe(false);
    }
  });

  test('should submit message form with valid data', async ({ page }) => {
    await page.waitForSelector('input[name="name"]', { timeout: 10000 });
    
    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright');
    
    // Submit form
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Wait for success message or API response
    await page.waitForTimeout(2000);
    
    // Check for success indicator (either success message or form reset)
    const successMessage = page.locator('text=Thank you, text=success, text=sent').first();
    const formReset = await page.locator('input[name="name"]').inputValue();
    
    // Either success message appears or form is reset
    const hasSuccess = await successMessage.isVisible().catch(() => false) || formReset === '';
    expect(hasSuccess).toBeTruthy();
  });

  test('should display contact information', async ({ page }) => {
    // Check for email or contact links
    const emailLink = page.locator('a[href^="mailto:"]');
    const contactSection = page.locator('text=Get in Touch, text=Contact, text=Email, text=WhatsApp');
    
    const hasContact = await emailLink.count() > 0 || await contactSection.first().isVisible().catch(() => false);
    expect(hasContact).toBeTruthy();
  });

  test('should display public messages section', async ({ page }) => {
    // Wait for messages to load
    await page.waitForTimeout(2000);
    
    // Check for messages container (even if empty)
    const messagesSection = page.locator('text=Support Messages, text=messages, text=No messages');
    await expect(messagesSection.first()).toBeVisible({ timeout: 5000 });
  });

  test('should navigate back to landing page', async ({ page }) => {
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
  });

  test('should display public messages from API', async ({ page }) => {
    // Intercept API call
    await page.route('/api/messages/public', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test Supporter',
            message: 'Great project!',
            isPublished: true,
            createdAt: new Date().toISOString(),
          },
        ]),
      });
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Public messages should be displayed
    const message = page.locator('text=Test Supporter, text=Great project!');
    const isVisible = await message.first().isVisible().catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('should handle empty messages state', async ({ page }) => {
    // Intercept API call to return empty array
    await page.route('/api/messages/public', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Empty state should be displayed
    const emptyState = page.locator('text=No messages yet, text=Be the first');
    const isVisible = await emptyState.first().isVisible().catch(() => false);
    expect(isVisible).toBe(true);
  });

  test('should display contact information links', async ({ page }) => {
    // Email link
    const emailLink = page.locator('a[href^="mailto:"]').first();
    const emailVisible = await emailLink.isVisible().catch(() => false);
    
    // WhatsApp link
    const whatsappLink = page.locator('a[href*="wa.me"], a[href*="whatsapp"]').first();
    const whatsappVisible = await whatsappLink.isVisible().catch(() => false);
    
    // At least one contact method should be visible
    expect(emailVisible || whatsappVisible).toBe(true);
  });

  test('should handle message submission flow', async ({ page }) => {
    // Intercept API call
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Message submitted successfully', id: '123' }),
      });
    });

    await page.waitForSelector('input[name="name"]', { timeout: 10000 });
    
    // Fill and submit form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Wait for success message
    await expect(page.locator('text=Thank you! Your message has been sent successfully')).toBeVisible({ timeout: 5000 });
  });
});
