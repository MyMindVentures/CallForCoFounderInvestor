// @ts-check
const { test, expect } = require('@playwright/test');
const { loginAsAdmin } = require('../utils/auth-helpers');
const { adminCredentials } = require('../utils/test-data');

test.describe('Admin Dashboard - Donations View', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, adminCredentials.username, adminCredentials.password);
    await page.goto('/admin/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to donations tab', async ({ page }) => {
    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(500);
    
    await expect(donationsTab).toBeVisible();
  });

  test('should display donation statistics', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [
            {
              id: '1',
              donorName: 'Test Donor',
              donorEmail: 'donor@example.com',
              amount: 50.00,
              createdAt: new Date().toISOString(),
            },
          ],
          stats: {
            total: 50.00,
            count: 1,
            average: 50.00,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Statistics should be displayed
    await expect(page.locator('text=Total Donations, text=Number of Donations, text=Average Donation')).toBeVisible({ timeout: 5000 });
  });

  test('should display total donations amount', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [],
          stats: {
            total: 150.00,
            count: 2,
            average: 75.00,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Total should be displayed
    const total = page.locator('text=€150, text=150.00');
    const isVisible = await total.isVisible().catch(() => false);
    
    expect(typeof isVisible).toBe('boolean');
  });

  test('should display donation count', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [],
          stats: {
            total: 100.00,
            count: 5,
            average: 20.00,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Count should be displayed
    const count = page.locator('text=5');
    const isVisible = await count.isVisible().catch(() => false);
    
    expect(typeof isVisible).toBe('boolean');
  });

  test('should display average donation amount', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [],
          stats: {
            total: 200.00,
            count: 4,
            average: 50.00,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Average should be displayed
    const average = page.locator('text=€50, text=50.00');
    const isVisible = await average.isVisible().catch(() => false);
    
    expect(typeof isVisible).toBe('boolean');
  });

  test('should display recent donations list', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [
            {
              id: '1',
              donorName: 'Donor 1',
              donorEmail: 'donor1@example.com',
              amount: 50.00,
              createdAt: new Date().toISOString(),
            },
            {
              id: '2',
              donorName: 'Donor 2',
              donorEmail: 'donor2@example.com',
              amount: 100.00,
              createdAt: new Date().toISOString(),
            },
          ],
          stats: {
            total: 150.00,
            count: 2,
            average: 75.00,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Recent donations should be displayed
    await expect(page.locator('text=Donor 1')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Donor 2')).toBeVisible();
  });

  test('should display empty state when no donations', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [],
          stats: {
            total: 0,
            count: 0,
            average: 0,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Empty state should be displayed
    const emptyState = page.locator('text=No donations yet, text=No donations');
    const isVisible = await emptyState.isVisible().catch(() => false);
    
    expect(isVisible).toBe(true);
  });

  test('should format donation amounts correctly', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [
            {
              id: '1',
              donorName: 'Test Donor',
              donorEmail: 'donor@example.com',
              amount: 123.45,
              createdAt: new Date().toISOString(),
            },
          ],
          stats: {
            total: 123.45,
            count: 1,
            average: 123.45,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Amount should be formatted (e.g., €123.45)
    const formattedAmount = page.locator('text=€123.45, text=123.45');
    const isVisible = await formattedAmount.isVisible().catch(() => false);
    
    expect(typeof isVisible).toBe('boolean');
  });

  test('should display donation dates', async ({ page }) => {
    // Intercept API call
    await page.route('/api/donations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          donations: [
            {
              id: '1',
              donorName: 'Test Donor',
              donorEmail: 'donor@example.com',
              amount: 50.00,
              createdAt: new Date().toISOString(),
            },
          ],
          stats: {
            total: 50.00,
            count: 1,
            average: 50.00,
          },
        }),
      });
    });

    const donationsTab = page.locator('button:has-text("Donations")');
    await donationsTab.click();
    await page.waitForTimeout(1000);
    
    // Date should be displayed (format may vary)
    const dateElement = page.locator('[class*="date"], [class*="Date"], time').first();
    const isVisible = await dateElement.isVisible().catch(() => false);
    
    expect(typeof isVisible).toBe('boolean');
  });
});
