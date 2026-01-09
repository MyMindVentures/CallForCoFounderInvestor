// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('API Endpoints', () => {
  test('health endpoint should return 200', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('OK');
    expect(body).toHaveProperty('service');
    expect(body).toHaveProperty('checks');
  });

  test('health endpoint should include database status', async ({ request }) => {
    const response = await request.get('/api/health');
    const body = await response.json();
    expect(body.checks).toHaveProperty('database');
    expect(['connected', 'disconnected']).toContain(body.checks.database);
  });

  test('public messages endpoint should return array', async ({ request }) => {
    const response = await request.get('/api/messages/public');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('content endpoint should return content', async ({ request }) => {
    const response = await request.get('/api/content/storytelling');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('content');
  });

  test('should create message via POST', async ({ request }) => {
    const response = await request.post('/api/messages', {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message from Playwright'
      }
    });
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('should reject message with invalid email', async ({ request }) => {
    const response = await request.post('/api/messages', {
      data: {
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message'
      }
    });
    expect([400, 422]).toContain(response.status());
  });

  test('should reject message with missing fields', async ({ request }) => {
    const response = await request.post('/api/messages', {
      data: {
        name: 'Test User'
        // Missing email and message
      }
    });
    expect([400, 422]).toContain(response.status());
  });

  test('admin login should require credentials', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: {
        username: 'test',
        password: 'test'
      }
    });
    // Should return 401 for invalid credentials or 400 for missing
    expect([400, 401]).toContain(response.status());
  });

  test('admin endpoints should require authentication', async ({ request }) => {
    const response = await request.get('/api/messages');
    expect(response.status()).toBe(401);
  });

  test('admin dashboard should require authentication', async ({ request }) => {
    const response = await request.get('/api/donations');
    expect(response.status()).toBe(401);
  });
});
