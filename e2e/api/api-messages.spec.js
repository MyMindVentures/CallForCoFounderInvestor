// @ts-check
const { test, expect } = require('@playwright/test');
const { createMessage, getAllMessages, getPublicMessages, curateMessage, loginViaAPI } = require('../utils/api-helpers');
const { testMessages, adminCredentials } = require('../utils/test-data');

test.describe('API Messages Endpoints', () => {
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

  test.describe('POST /api/messages', () => {
    test('should create a message successfully', async ({ request }) => {
      const response = await request.post('/api/messages', {
        data: testMessages.valid,
      });

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('id');
      expect(data.message).toContain('successfully');
    });

    test('should fail with missing name', async ({ request }) => {
      const response = await request.post('/api/messages', {
        data: {
          email: testMessages.valid.email,
          message: testMessages.valid.message,
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should fail with missing email', async ({ request }) => {
      const response = await request.post('/api/messages', {
        data: {
          name: testMessages.valid.name,
          message: testMessages.valid.message,
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should fail with missing message', async ({ request }) => {
      const response = await request.post('/api/messages', {
        data: {
          name: testMessages.valid.name,
          email: testMessages.valid.email,
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should fail with invalid email format', async ({ request }) => {
      const response = await request.post('/api/messages', {
        data: testMessages.invalidEmail,
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  test.describe('GET /api/messages', () => {
    test('should get all messages with valid token', async ({ request }) => {
      const response = await request.get('/api/messages', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('should fail without authentication token', async ({ request }) => {
      const response = await request.get('/api/messages');

      expect(response.status()).toBe(401);
    });

    test('should fail with invalid token', async ({ request }) => {
      const response = await request.get('/api/messages', {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
      });

      expect(response.status()).toBe(401);
    });
  });

  test.describe('GET /api/messages/public', () => {
    test('should get public messages without authentication', async ({ request }) => {
      const response = await request.get('/api/messages/public');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('should only return published messages', async ({ request }) => {
      // Create a message first
      const createResponse = await request.post('/api/messages', {
        data: testMessages.valid,
      });
      const createData = await createResponse.json();
      const messageId = createData.id;

      // Get all messages to find the one we just created
      const allMessagesResponse = await request.get('/api/messages', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const allMessages = await allMessagesResponse.json();
      const ourMessage = allMessages.find(m => m.id === messageId || m._id === messageId);

      if (ourMessage) {
        // Publish the message
        await request.put(`/api/messages/${messageId}/curate`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          data: {
            isPositive: true,
            isPublished: true,
          },
        });

        // Get public messages
        const publicResponse = await request.get('/api/messages/public');
        const publicMessages = await publicResponse.json();
        
        // Check if our message is in the public list
        const found = publicMessages.find(m => (m.id === messageId || m._id === messageId));
        expect(found).toBeTruthy();
      }
    });
  });

  test.describe('PUT /api/messages/:id/curate', () => {
    test('should curate a message with valid token', async ({ request }) => {
      // First create a message
      const createResponse = await request.post('/api/messages', {
        data: testMessages.valid,
      });
      const createData = await createResponse.json();
      const messageId = createData.id;

      // Curate the message
      const response = await request.put(`/api/messages/${messageId}/curate`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          isPositive: true,
          isPublished: true,
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('isPositive');
      expect(data).toHaveProperty('isPublished');
    });

    test('should fail without authentication token', async ({ request }) => {
      const response = await request.put('/api/messages/1/curate', {
        data: {
          isPositive: true,
          isPublished: true,
        },
      });

      expect(response.status()).toBe(401);
    });

    test('should fail with invalid message id', async ({ request }) => {
      const response = await request.put('/api/messages/invalid-id/curate', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          isPositive: true,
          isPublished: true,
        },
      });

      expect(response.status()).toBe(404);
    });
  });
});
