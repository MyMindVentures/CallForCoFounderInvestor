// @ts-check
const { test, expect } = require('@playwright/test');
const { loginViaAPI } = require('../utils/api-helpers');
const { adminCredentials } = require('../utils/test-data');

test.describe('API Auth Endpoints', () => {
  test.describe('POST /api/auth/login', () => {
    test('should login successfully with valid credentials', async ({ request }) => {
      const response = await request.post('/api/auth/login', {
        data: {
          username: adminCredentials.username,
          password: adminCredentials.password,
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('token');
      expect(data).toHaveProperty('username');
      expect(data.token).toBeTruthy();
      expect(typeof data.token).toBe('string');
    });

    test('should fail with invalid credentials', async ({ request }) => {
      const response = await request.post('/api/auth/login', {
        data: {
          username: 'invalid',
          password: 'wrongpassword',
        },
      });

      expect(response.status()).toBe(401);
      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toContain('Invalid credentials');
    });

    test('should fail with missing username', async ({ request }) => {
      const response = await request.post('/api/auth/login', {
        data: {
          password: adminCredentials.password,
        },
      });

      expect(response.status()).toBe(401);
    });

    test('should fail with missing password', async ({ request }) => {
      const response = await request.post('/api/auth/login', {
        data: {
          username: adminCredentials.username,
        },
      });

      expect(response.status()).toBe(401);
    });

    test('should fail with empty credentials', async ({ request }) => {
      const response = await request.post('/api/auth/login', {
        data: {},
      });

      expect(response.status()).toBe(401);
    });
  });

  test.describe('POST /api/auth/init', () => {
    test('should initialize admin user', async ({ request }) => {
      const response = await request.post('/api/auth/init');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('message');
    });
  });
});
