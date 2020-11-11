module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@amanda-mitchell/semantic-release-npm-multiple',
      { github: {}, public: {} },
    ],
    '@semantic-release/github',
  ],
};
