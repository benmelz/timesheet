module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.jsx',
    '!src/serviceWorker.js',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  testEnvironment: 'jsdom',
};
