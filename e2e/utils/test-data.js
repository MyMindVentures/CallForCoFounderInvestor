// @ts-check
/**
 * Test data fixtures for Playwright tests
 */

const testMessages = {
  valid: {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message for the support page.',
  },
  invalidEmail: {
    name: 'Test User',
    email: 'invalid-email',
    message: 'This message has an invalid email.',
  },
  missingFields: {
    name: '',
    email: 'test@example.com',
    message: 'Missing name field.',
  },
  longMessage: {
    name: 'Test User',
    email: 'test@example.com',
    message: 'A'.repeat(1000),
  },
};

const testDonations = {
  valid: {
    donorName: 'Test Donor',
    donorEmail: 'donor@example.com',
    amount: 50.00,
  },
  largeAmount: {
    donorName: 'Big Donor',
    donorEmail: 'bigdonor@example.com',
    amount: 1000.00,
  },
  smallAmount: {
    donorName: 'Small Donor',
    donorEmail: 'smalldonor@example.com',
    amount: 5.00,
  },
  invalidAmount: {
    donorName: 'Test Donor',
    donorEmail: 'donor@example.com',
    amount: -10,
  },
};

const testContent = {
  storytelling: '<h1>My Story</h1><p>This is my story content.</p>',
  whatILookFor: '<h1>What I Look For</h1><p>I am looking for partners.</p>',
  developerHelp: '<h1>Developer Help</h1><p>I need developer assistance.</p>',
  financialHelp: '<h1>Financial Help</h1><p>I need financial support.</p>',
  support: '<h1>Support</h1><p>Thank you for your support!</p>',
  adhDAries: '<h1>ADHD + Aries</h1><p>My personality traits.</p>',
};

const adminCredentials = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

module.exports = {
  testMessages,
  testDonations,
  testContent,
  adminCredentials,
};
