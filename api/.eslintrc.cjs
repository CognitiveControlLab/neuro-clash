module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'airbnb-typescript'],
  ignorePatterns: ['node_modules/**', '.eslintrc.cjs', 'tsconfig.json'],
  parserOptions: {
    ecmaVersion: 2021,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'simple-import-sort',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  parser: '@typescript-eslint/parser',
};
