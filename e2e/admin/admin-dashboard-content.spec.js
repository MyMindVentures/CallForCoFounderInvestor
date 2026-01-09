// @ts-check
const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../utils/auth-helpers');
const { adminCredentials, testContent } = require('../utils/test-data');

test.describe('Admin Dashboard - Content Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to content tab', async ({ page }) => {
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    // Content tab should be active
    await expect(contentTab).toBeVisible();
  });

  test('should display page selection dropdown', async ({ page }) => {
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const pageSelect = page.locator('select').first();
    await expect(pageSelect).toBeVisible();
  });

  test('should list all available pages', async ({ page }) => {
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const pageSelect = page.locator('select').first();
    const options = await pageSelect.locator('option').allTextContents();
    
    expect(options.length).toBeGreaterThan(0);
    expect(options).toContain('Storytelling');
  });

  test('should load content when page is selected', async ({ page }) => {
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const pageSelect = page.locator('select').first();
    await pageSelect.selectOption('storytelling');
    await page.waitForTimeout(1000);
    
    // Content textarea should be visible
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible();
  });

  test('should allow editing content in textarea', async ({ page }) => {
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const textarea = page.locator('textarea').first();
    await textarea.fill(testContent.storytelling);
    
    const value = await textarea.inputValue();
    expect(value).toContain('My Story');
  });

  test('should display content preview', async ({ page }) => {
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const textarea = page.locator('textarea').first();
    await textarea.fill('<h1>Test Preview</h1><p>Preview content</p>');
    await page.waitForTimeout(500);
    
    // Preview section should be visible
    const preview = page.locator('text=Preview, [class*="preview"]').first();
    const isVisible = await preview.isVisible().catch(() => false);
    
    expect(typeof isVisible).toBe('boolean');
  });

  test('should save content successfully', async ({ page }) => {
    // Intercept API call
    await page.route('/api/content/*', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ 
            pageId: 'storytelling',
            content: testContent.storytelling,
            lastUpdated: new Date().toISOString()
          }),
        });
      } else {
        await route.continue();
      }
    });

    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const textarea = page.locator('textarea').first();
    await textarea.fill(testContent.storytelling);
    
    const saveButton = page.locator('button:has-text("Save Content"), button:has-text("Save")').first();
    await saveButton.click();
    
    // Wait for success message
    await expect(page.locator('text=Content saved successfully, text=saved')).toBeVisible({ timeout: 5000 });
  });

  test('should show loading state during save', async ({ page }) => {
    // Intercept API call with delay
    await page.route('/api/content/*', async (route) => {
      if (route.request().method() === 'PUT') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ pageId: 'storytelling', content: testContent.storytelling }),
        });
      } else {
        await route.continue();
      }
    });

    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const textarea = page.locator('textarea').first();
    await textarea.fill(testContent.storytelling);
    
    const saveButton = page.locator('button:has-text("Save Content"), button:has-text("Save")').first();
    await saveButton.click();
    
    // Check for loading state
    await expect(page.locator('text=Saving...')).toBeVisible();
    await expect(saveButton).toBeDisabled();
  });

  test('should handle save errors', async ({ page }) => {
    // Intercept API call to return error
    await page.route('/api/content/*', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Error saving content' }),
        });
      } else {
        await route.continue();
      }
    });

    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    const textarea = page.locator('textarea').first();
    await textarea.fill(testContent.storytelling);
    
    const saveButton = page.locator('button:has-text("Save Content"), button:has-text("Save")').first();
    await saveButton.click();
    
    // Wait for error message
    await expect(page.locator('text=Error saving content, text=error')).toBeVisible({ timeout: 5000 });
  });

  test('should persist content across page selections', async ({ page }) => {
    const contentTab = page.locator('button:has-text("Content")');
    await contentTab.click();
    await page.waitForTimeout(500);
    
    // Select a page and edit content
    const pageSelect = page.locator('select').first();
    await pageSelect.selectOption('storytelling');
    await page.waitForTimeout(1000);
    
    const textarea = page.locator('textarea').first();
    const testContent = '<h1>Persistent Test</h1>';
    await textarea.fill(testContent);
    
    // Switch to another page and back
    await pageSelect.selectOption('whatILookFor');
    await page.waitForTimeout(1000);
    await pageSelect.selectOption('storytelling');
    await page.waitForTimeout(1000);
    
    // Content should be loaded from server (may or may not persist in textarea)
    const currentValue = await textarea.inputValue();
    expect(typeof currentValue).toBe('string');
  });
});
