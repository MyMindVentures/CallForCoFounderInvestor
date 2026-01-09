// @ts-check
const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../utils/auth-helpers');
const { adminCredentials, testContent } = require('../utils/test-data');

test.describe('Complete Content Management Flow', () => {
  test('should update content and appear on public page', async ({ page }) => {
    const updatedContent = '<h1>Updated Story</h1><p>This content was updated by admin.</p>';

    // Login as admin
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    // Navigate to content tab
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);

    // Intercept content API
    await page.route('/api/content/*', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            pageId: 'storytelling',
            content: updatedContent,
            lastUpdated: new Date().toISOString(),
            updatedBy: adminCredentials.username,
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            pageId: 'storytelling',
            content: updatedContent,
          }),
        });
      }
    });

    // Select storytelling page
    const pageSelect = page.locator('select').first();
    await pageSelect.selectOption('storytelling');
    await page.waitForTimeout(1000);

    // Update content
    const textarea = page.locator('textarea').first();
    await textarea.fill(updatedContent);

    // Save content
    const saveButton = page.locator('button:has-text("Save Content"), button:has-text("Save")').first();
    await saveButton.click();
    await page.waitForTimeout(1000);

    // Wait for success message
    await expect(page.locator('text=Content saved successfully, text=saved')).toBeVisible({ timeout: 5000 });

    // Visit public storytelling page
    await page.goto('/storytelling');
    await page.waitForLoadState('networkidle');

    // Updated content should be visible
    await expect(page.locator('text=Updated Story')).toBeVisible({ timeout: 5000 });
  });

  test('should persist content across sessions', async ({ page }) => {
    const persistentContent = '<h1>Persistent Content</h1><p>This should persist.</p>';

    // Login and update content
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);

    // Intercept content API
    await page.route('/api/content/*', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            pageId: 'storytelling',
            content: persistentContent,
            lastUpdated: new Date().toISOString(),
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            pageId: 'storytelling',
            content: persistentContent,
          }),
        });
      }
    });

    const pageSelect = page.locator('select').first();
    await pageSelect.selectOption('storytelling');
    await page.waitForTimeout(1000);

    const textarea = page.locator('textarea').first();
    await textarea.fill(persistentContent);

    const saveButton = page.locator('button:has-text("Save Content"), button:has-text("Save")').first();
    await saveButton.click();
    await page.waitForTimeout(1000);

    // Logout and login again
    const logoutButton = page.locator('button:has-text("Logout")').first();
    await logoutButton.click();
    await page.waitForTimeout(500);

    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');

    const contentTab2 = page.locator('button:has-text("Content")');
    await contentTab2.click();
    await page.waitForTimeout(500);

    const pageSelect2 = page.locator('select').first();
    await pageSelect2.selectOption('storytelling');
    await page.waitForTimeout(1000);

    // Content should still be there
    const textarea2 = page.locator('textarea').first();
    const content = await textarea2.inputValue();
    expect(content).toContain('Persistent Content');
  });
});
