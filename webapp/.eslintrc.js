module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'airbnb-typescript'],
  ignorePatterns: ['node_modules/**', '.eslintrc.js', 'vite.config.ts', 'vitest.config.ts', 'yarn.lock'],
  parserOptions: {
    ecmaVersion: 2021,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'simple-import-sort',
    'react-hooks',
    '@typescript-eslint',
    'testing-library'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    "react-hooks/exhaustive-deps": "error",
  },
  parser: '@typescript-eslint/parser',
};
