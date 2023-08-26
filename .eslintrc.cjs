module.exports = {
  extends: 'eslint:recommended',
  root: true,
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  env: { node: true, es6: true },
  overrides: [
    {
      files: ['**/__tests__/*.{js,jsx}'],
      env: { jest: true },
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
};
