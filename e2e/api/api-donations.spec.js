// @ts-check
const { test, expect } = require('@playwright/test');
const { createDonation, getAllDonations } = require('../utils/api-helpers');
const { testDonations, adminCredentials } = require('../utils/test-data');

test.describe('API Donations Endpoints', () => {
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

  test.describe('POST /api/donations', () => {
    test('should create a donation successfully', async ({ request }) => {
      const response = await request.post('/api/donations', {
        data: testDonations.valid,
      });

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('donation');
      expect(data.message).toContain('successfully');
      expect(data.donation).toHaveProperty('amount');
      expect(data.donation.amount).toBe(testDonations.valid.amount);
    });

    test('should fail with missing donorName', async ({ request }) => {
      const response = await request.post('/api/donations', {
        data: {
          donorEmail: testDonations.valid.donorEmail,
          amount: testDonations.valid.amount,
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should fail with missing donorEmail', async ({ request }) => {
      const response = await request.post('/api/donations', {
        data: {
          donorName: testDonations.valid.donorName,
          amount: testDonations.valid.amount,
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should fail with missing amount', async ({ request }) => {
      const response = await request.post('/api/donations', {
        data: {
          donorName: testDonations.valid.donorName,
          donorEmail: testDonations.valid.donorEmail,
        },
      });

      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should handle large donation amounts', async ({ request }) => {
      const response = await request.post('/api/donations', {
        data: testDonations.largeAmount,
      });

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data.donation.amount).toBe(testDonations.largeAmount.amount);
    });

    test('should handle small donation amounts', async ({ request }) => {
      const response = await request.post('/api/donations', {
        data: testDonations.smallAmount,
      });

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data.donation.amount).toBe(testDonations.smallAmount.amount);
    });
  });

  test.describe('GET /api/donations', () => {
    test('should get all donations with valid token', async ({ request }) => {
      const response = await request.get('/api/donations', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('donations');
      expect(data).toHaveProperty('stats');
      expect(Array.isArray(data.donations)).toBe(true);
      expect(data.stats).toHaveProperty('total');
      expect(data.stats).toHaveProperty('count');
      expect(data.stats).toHaveProperty('average');
    });

    test('should fail without authentication token', async ({ request }) => {
      const response = await request.get('/api/donations');

      expect(response.status()).toBe(401);
    });

    test('should fail with invalid token', async ({ request }) => {
      const response = await request.get('/api/donations', {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
      });

      expect(response.status()).toBe(401);
    });

    test('should calculate statistics correctly', async ({ request }) => {
      // Create a few donations first
      await request.post('/api/donations', {
        data: testDonations.valid,
      });
      await request.post('/api/donations', {
        data: testDonations.smallAmount,
      });

      const response = await request.get('/api/donations', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      expect(data.stats.count).toBeGreaterThan(0);
      expect(data.stats.total).toBeGreaterThan(0);
      expect(data.stats.average).toBeGreaterThan(0);
    });
  });
});
