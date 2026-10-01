const basePath = (process.env.BASE_PATH ?? '').replace(/\/$/, '');
const siteUrl = `http://localhost:4173${basePath}/`;

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm run preview --host 0.0.0.0',
      startServerReadyPattern: 'Local',
      url: [siteUrl],
      numberOfRuns: 1,
      settings: {
        chromeFlags: ['--no-sandbox']
      }
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.6 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-report'
    }
  }
};
