const fs = require('fs');
const path = require('path');
const pkgDir = require('pkg-dir');

const hostDirectory = process.env['INIT_CWD'];
if (!hostDirectory) {
  return;
}

const packageDirectory = pkgDir.sync(hostDirectory);
if (!packageDirectory) {
  return;
}

for (const config of [
  'commitlint.config',
  'husky.config',
  'lint-staged.config',
  '.eslintrc',
  'prettier.config',
  'release.config',
  'jest.config',
]) {
  const content = `module.exports = require('@amanda-mitchell/node-project-scripts/${config}');\n`;
  fs.writeFileSync(path.join(packageDirectory, `${config}.js`), content);
}

fs.writeFileSync(
  path.join(packageDirectory, 'tsconfig.json'),
  JSON.stringify({
    extends: '@amanda-mitchell/node-project-scripts/tsconfig.json',
  })
);
