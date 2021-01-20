const fs = require('fs');

let issuePublicRelease = false;
let isScopedPackage = false;
try {
  const packageJson = JSON.parse(
    fs.readFileSync('./package.json', { encoding: 'utf-8' })
  );
  if (
    packageJson.publishConfig &&
    packageJson.publishConfig.access === 'public'
  ) {
    issuePublicRelease = true;
  }

  if (packageJson.name.startsWith('@amanda-mitchell/')) {
    isScopedPackage = true;
  }
} catch (x) {
  // Skip this check if we can't find or parse package.json.
}

module.exports = {
  branches: ['main'],
};

if (issuePublicRelease && isScopedPackage) {
  module.exports.plugins = [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@amanda-mitchell/semantic-release-npm-multiple',
      { registries: { github: {}, public: {} } },
    ],
    '@amanda-mitchell/semantic-release-notify-dependabot',
    '@semantic-release/github',
  ];
} else {
  module.exports.plugins = [
    '@semantic-release/commit-analyzer',
    '@semantic-release/npm',
    '@amanda-mitchell/semantic-release-notify-dependabot',
    '@semantic-release/github',
  ];
}
