// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('API Health Check Endpoints', () => {
  test.describe('GET /api/health', () => {
    test('should return backend health status', async ({ request }) => {
      const response = await request.get('/api/health');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('service');
      expect(data).toHaveProperty('uptime');
      expect(data).toHaveProperty('checks');
      expect(data.service).toBe('backend');
      expect(['OK', 'DEGRADED']).toContain(data.status);
    });

    test('should include database connection status', async ({ request }) => {
      const response = await request.get('/api/health');
      const data = await response.json();

      expect(data.checks).toHaveProperty('database');
      expect(['connected', 'disconnected', 'unknown']).toContain(data.checks.database);
    });

    test('should include memory usage information', async ({ request }) => {
      const response = await request.get('/api/health');
      const data = await response.json();

      expect(data.checks).toHaveProperty('memory');
      expect(data.checks.memory).toHaveProperty('used');
      expect(data.checks.memory).toHaveProperty('total');
      expect(data.checks.memory).toHaveProperty('unit');
      expect(data.checks.memory.unit).toBe('MB');
      expect(typeof data.checks.memory.used).toBe('number');
      expect(typeof data.checks.memory.total).toBe('number');
    });

    test('should return appropriate status code based on health', async ({ request }) => {
      const response = await request.get('/api/health');
      const data = await response.json();

      if (data.status === 'OK') {
        expect(response.status()).toBe(200);
      } else if (data.status === 'DEGRADED') {
        expect(response.status()).toBe(503);
      }
    });

    test('should include version information', async ({ request }) => {
      const response = await request.get('/api/health');
      const data = await response.json();

      expect(data).toHaveProperty('version');
      expect(typeof data.version).toBe('string');
    });
  });

  test.describe('GET /health', () => {
    test('should return frontend health status', async ({ request }) => {
      const response = await request.get('/health');

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('service');
      expect(data).toHaveProperty('message');
      expect(data.service).toBe('frontend');
      expect(data.status).toBe('OK');
    });
  });
});
