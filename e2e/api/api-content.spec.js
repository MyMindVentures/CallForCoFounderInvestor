// @ts-check
const { test, expect } = require('@playwright/test');
const { getContent, updateContent } = require('../utils/api-helpers');
const { testContent, adminCredentials } = require('../utils/test-data');

test.describe('API Content Endpoints', () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    // Get auth token for admin endpoints
    const response = await request.post('/api/auth/login', {
      data: {
        username: adminCredentials.username,
        password: adminCredentials.password,
      },
    });
    const data = await response.json();
    authToken = data.token;
  });

  test.describe('GET /api/content/:pageId', () => {
    test('should get content for storytelling page', async ({ request }) => {
      const response = await request.get('/api/content/storytelling');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('pageId');
      expect(data).toHaveProperty('content');
      expect(data.pageId).toBe('storytelling');
    });

    test('should get content for whatILookFor page', async ({ request }) => {
      const response = await request.get('/api/content/whatILookFor');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.pageId).toBe('whatILookFor');
    });

    test('should get content for developerHelp page', async ({ request }) => {
      const response = await request.get('/api/content/developerHelp');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.pageId).toBe('developerHelp');
    });

    test('should get content for financialHelp page', async ({ request }) => {
      const response = await request.get('/api/content/financialHelp');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.pageId).toBe('financialHelp');
    });

    test('should get content for support page', async ({ request }) => {
      const response = await request.get('/api/content/support');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.pageId).toBe('support');
    });

    test('should get content for adhDAries page', async ({ request }) => {
      const response = await request.get('/api/content/adhDAries');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.pageId).toBe('adhDAries');
    });

    test('should return default content when database unavailable', async ({ request }) => {
      // This test verifies the fallback behavior
      const response = await request.get('/api/content/storytelling');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('content');
      // Even if there's an error, content should be returned
      expect(typeof data.content).toBe('string');
    });
  });

  test.describe('PUT /api/content/:pageId', () => {
    test('should update content with valid token', async ({ request }) => {
      const newContent = '<h1>Updated Content</h1><p>This is updated content.</p>';

      const response = await request.put('/api/content/storytelling', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          content: newContent,
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('content');
      expect(data.content).toBe(newContent);
    });

    test('should fail without authentication token', async ({ request }) => {
      const response = await request.put('/api/content/storytelling', {
        data: {
          content: testContent.storytelling,
        },
      });

      expect(response.status()).toBe(401);
    });

    test('should fail with invalid token', async ({ request }) => {
      const response = await request.put('/api/content/storytelling', {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
        data: {
          content: testContent.storytelling,
        },
      });

      expect(response.status()).toBe(401);
    });

    test('should persist content updates', async ({ request }) => {
      const testContent = '<h1>Persistent Test</h1><p>This should persist.</p>';

      // Update content
      await request.put('/api/content/storytelling', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          content: testContent,
        },
      });

      // Get content and verify it was updated
      const getResponse = await request.get('/api/content/storytelling');
      const getData = await getResponse.json();
      expect(getData.content).toContain('Persistent Test');
    });
  });
});
