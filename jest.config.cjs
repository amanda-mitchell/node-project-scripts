const path = require('path');

function findTsJestPreset() {
  let resolvedPath = require.resolve('ts-jest');

  while (path.basename(resolvedPath) !== 'ts-jest') {
    const parent = path.dirname(resolvedPath);
    if (resolvedPath === parent) {
      throw new Error('unable to find ts-jest parent folder.');
    }
    resolvedPath = parent;
  }
  
  return resolvedPath;
}

module.exports = {
  preset: findTsJestPreset(),
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['.*\\.d\\.ts$'],
};
