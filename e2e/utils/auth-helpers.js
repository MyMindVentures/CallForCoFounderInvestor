// @ts-check
/**
 * Authentication helper functions for Playwright tests
 */

/**
 * Login as admin user
 * @param {import('@playwright/test').Page} page
 * @param {string} username
 * @param {string} password
 */
async function loginAsAdmin(page, username, password) {
  await page.goto('/admin/login');
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin/dashboard', { timeout: 5000 });
}

/**
 * Get authentication token from localStorage
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string|null>}
 */
async function getAuthToken(page) {
  return await page.evaluate(() => localStorage.getItem('adminToken'));
}

/**
 * Logout admin user
 * @param {import('@playwright/test').Page} page
 */
async function logout(page) {
  await page.evaluate(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
  });
  await page.goto('/admin/login');
}

/**
 * Check if user is authenticated
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<boolean>}
 */
async function isAuthenticated(page) {
  const token = await getAuthToken(page);
  return token !== null && token.length > 0;
}

module.exports = {
  loginAsAdmin,
  getAuthToken,
  logout,
  isAuthenticated,
};
