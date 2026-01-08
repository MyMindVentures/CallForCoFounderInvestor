module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview --workspace=frontend',
      startServerReadyPattern: 'Local',
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/storytelling',
        'http://localhost:4173/what-i-look-for',
        'http://localhost:4173/developer-help',
        'http://localhost:4173/financial-help',
        'http://localhost:4173/support',
        'http://localhost:4173/adhd-aries',
        'http://localhost:4173/admin/login',
        'http://localhost:4173/admin/dashboard',
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
