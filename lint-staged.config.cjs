module.exports = {
  '*.js': ['eslint --fix', 'prettier --write'],
  '*.mjs': ['eslint --fix', 'prettier --write'],
  '*.cjs': ['eslint --fix', 'prettier --write'],
  '*.jsx': ['eslint --fix', 'prettier --write'],
  '*.ts': ['eslint --fix', 'prettier --write'],
  '*.tsx': ['eslint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
  '*.json': ['prettier --write'],
};
