module.exports = {
  extends: 'eslint:recommended',
  parserOptions: { ecmaVersion: 2018 },
  env: { node: true, es6: true },
  overrides: [{ files: ['**/__tests__/*.js'], env: { jest: true } }],
};
