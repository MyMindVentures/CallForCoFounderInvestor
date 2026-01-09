// @ts-check
/**
 * API helper functions for Playwright tests
 */

/**
 * Create a message via API
 * @param {import('@playwright/test').Page} page
 * @param {Object} data - Message data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.message
 * @returns {Promise<Object>}
 */
async function createMessage(page, data) {
  const response = await page.request.post('/api/messages', {
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
    },
  });
  return await response.json();
}

/**
 * Create a donation via API
 * @param {import('@playwright/test').Page} page
 * @param {Object} data - Donation data
 * @param {string} data.donorName
 * @param {string} data.donorEmail
 * @param {number} data.amount
 * @returns {Promise<Object>}
 */
async function createDonation(page, data) {
  const response = await page.request.post('/api/donations', {
    data: {
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      amount: data.amount,
    },
  });
  return await response.json();
}

/**
 * Get content for a page
 * @param {import('@playwright/test').Page} page
 * @param {string} pageId
 * @returns {Promise<Object>}
 */
async function getContent(page, pageId) {
  const response = await page.request.get(`/api/content/${pageId}`);
  return await response.json();
}

/**
 * Update content for a page (requires auth)
 * @param {import('@playwright/test').Page} page
 * @param {string} pageId
 * @param {string} content
 * @param {string} token
 * @returns {Promise<Object>}
 */
async function updateContent(page, pageId, content, token) {
  const response = await page.request.put(`/api/content/${pageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      content: content,
    },
  });
  return await response.json();
}

/**
 * Get all messages (admin only)
 * @param {import('@playwright/test').Page} page
 * @param {string} token
 * @returns {Promise<Object>}
 */
async function getAllMessages(page, token) {
  const response = await page.request.get('/api/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

/**
 * Get public messages
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<Object>}
 */
async function getPublicMessages(page) {
  const response = await page.request.get('/api/messages/public');
  return await response.json();
}

/**
 * Curate a message (admin only)
 * @param {import('@playwright/test').Page} page
 * @param {string} messageId
 * @param {boolean} isPositive
 * @param {boolean} isPublished
 * @param {string} token
 * @returns {Promise<Object>}
 */
async function curateMessage(page, messageId, isPositive, isPublished, token) {
  const response = await page.request.put(`/api/messages/${messageId}/curate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      isPositive,
      isPublished,
    },
  });
  return await response.json();
}

/**
 * Get all donations (admin only)
 * @param {import('@playwright/test').Page} page
 * @param {string} token
 * @returns {Promise<Object>}
 */
async function getAllDonations(page, token) {
  const response = await page.request.get('/api/donations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

/**
 * Get all media
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<Object>}
 */
async function getAllMedia(page) {
  const response = await page.request.get('/api/media/all');
  return await response.json();
}

/**
 * Get app projects
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<Object>}
 */
async function getAppProjects(page) {
  const response = await page.request.get('/api/media/projects');
  return await response.json();
}

/**
 * Login via API and get token
 * @param {import('@playwright/test').Page} page
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>}
 */
async function loginViaAPI(page, username, password) {
  const response = await page.request.post('/api/auth/login', {
    data: {
      username,
      password,
    },
  });
  const data = await response.json();
  return data.token;
}

module.exports = {
  createMessage,
  createDonation,
  getContent,
  updateContent,
  getAllMessages,
  getPublicMessages,
  curateMessage,
  getAllDonations,
  getAllMedia,
  getAppProjects,
  loginViaAPI,
};
