const fs = require('fs');

for (const config of [
  'commitlint.config',
  'husky.config',
  'lint-staged.config',
  '.eslintrc',
  'prettier.config',
  'release.config',
]) {
  const content = `module.exports = require('@david-mitchell/node-project-scripts/${config}');\n`;
  fs.writeFileSync(`${config}.js`, content);
}
