// @ts-check
const { test, expect } = require('@playwright/test');
const { testMessages } = require('../utils/test-data');

test.describe('MessageForm Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/support');
    await page.waitForLoadState('networkidle');
  });

  test('should display all form fields', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageTextarea).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    
    // Try to submit empty form
    await submitButton.click();
    
    // HTML5 validation should prevent submission
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    
    // Check if validation attributes are present
    await expect(nameInput).toHaveAttribute('required', '');
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(messageTextarea).toHaveAttribute('required', '');
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    const submitButton = page.locator('button[type="submit"]');
    
    await emailInput.fill('invalid-email');
    await submitButton.click();
    
    // HTML5 email validation should prevent submission
    const validity = await emailInput.evaluate((el) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    // Intercept the API call
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Message submitted successfully', id: '123' }),
      });
    });

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
  });

  test('should display error message on submission failure', async ({ page }) => {
    // Intercept the API call to return error
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to send message' }),
      });
    });

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await nameInput.fill(testMessages.valid.name);
    await emailInput.fill(testMessages.valid.email);
    await messageTextarea.fill(testMessages.valid.message);

    await submitButton.click();

    // Wait for error message
    await expect(page.locator('text=Failed to send message')).toBeVisible({ timeout: 5000 });
  });

  test('should show loading state during submission', async ({ page }) => {
    // Intercept the API call with delay
    await page.route('/api/messages', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Message submitted successfully', id: '123' }),
      });
    });

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await nameInput.fill(testMessages.valid.name);
    await emailInput.fill(testMessages.valid.email);
    await messageTextarea.fill(testMessages.valid.message);

    await submitButton.click();

    // Check for loading state
    await expect(page.locator('text=Sending...')).toBeVisible();
    await expect(submitButton).toBeDisabled();
  });

  test('should reset form after successful submission', async ({ page }) => {
    // Intercept the API call
    await page.route('/api/messages', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Message submitted successfully', id: '123' }),
      });
    });

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await nameInput.fill(testMessages.valid.name);
    await emailInput.fill(testMessages.valid.email);
    await messageTextarea.fill(testMessages.valid.message);

    await submitButton.click();

    // Wait for success message and form reset
    await expect(page.locator('text=Thank you! Your message has been sent successfully')).toBeVisible();
    
    // Form should be reset
    await expect(nameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(messageTextarea).toHaveValue('');
  });

  test('should have proper labels and placeholders', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');

    await expect(nameInput).toHaveAttribute('placeholder', 'Your name');
    await expect(emailInput).toHaveAttribute('placeholder', 'your.email@example.com');
    await expect(messageTextarea).toHaveAttribute('placeholder', 'Your message...');
  });
});
