import { test, expect } from '@playwright/test';

test('landing page renders hero heading', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Call for Investor/CoFounder' })
  ).toBeVisible();
});
