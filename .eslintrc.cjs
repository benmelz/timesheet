module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx'],
      extends: [
        'google',
        'plugin:react/recommended',
      ],
    },
  ],
  ignorePatterns: [
    '/dist/',
    '/node_modules/',
  ],
};
