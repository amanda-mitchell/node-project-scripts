import fs from 'fs';
import path from 'path';
import { packageDirectorySync } from 'pkg-dir';

(function main() {
  const hostDirectory = process.env['INIT_CWD'];
  if (!hostDirectory) {
    return;
  }

  const packageDirectory = packageDirectorySync(hostDirectory);
  if (!packageDirectory) {
    return;
  }

  if (
    JSON.parse(fs.readFileSync('package.json')).name ===
    '@amanda-mitchell/node-project-scripts'
  ) {
    console.warn(
      'Skipping install script because this project cannot be installed on top of itself.'
    );
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
    JSON.stringify(
      {
        extends: '@amanda-mitchell/node-project-scripts/tsconfig.json',
        compilerOptions: {
          outDir: './dist' /* Redirect output structure to the directory. */,
          rootDir:
            './lib' /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
        },
      },
      null,
      2
    )
  );
})();
