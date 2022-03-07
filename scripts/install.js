import fs from 'fs';
import path from 'path';
import { packageDirectorySync } from 'pkg-dir';

(function main() {
  const hostDirectory = process.env['INIT_CWD'];
  if (!hostDirectory) {
    console.error(
      'Skipping install because INIT_CWD environment variable is missing.'
    );
    return;
  }

  const packageDirectory = packageDirectorySync({ cwd: hostDirectory });
  if (!packageDirectory) {
    console.error(
      'Skipping install because package directory cannot be found.'
    );
    return;
  }

  if (
    JSON.parse(fs.readFileSync(path.join(packageDirectory, 'package.json')))
      .name === '@amanda-mitchell/node-project-scripts'
  ) {
    console.error(
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
  ]) {
    fs.rmSync(path.join(packageDirectory, `${config}.js`), { force: true });

    const content = `module.exports = require('@amanda-mitchell/node-project-scripts/${config}.cjs');\n`;
    fs.writeFileSync(path.join(packageDirectory, `${config}.cjs`), content);
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

  fs.rmSync(path.join(packageDirectory, 'jest.config.js', { force: true }));
  fs.rmSync(path.join(packageDirectory, 'jest.config.cjs', { force: true }));
  fs.writeFileSync(
    path.join(
      packageDirectory,
      'jest.config.json',
      JSON.stringify(
        { preset: '@amanda-mitchell/node-project-scripts' },
        null,
        2
      )
    )
  );
})();
