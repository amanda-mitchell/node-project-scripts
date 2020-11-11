# node-project-scripts

https://github.com/amanda-mitchell/node-project-scripts/workflows/Release/badge.svg

This package contains common configuration and settings for use across all of my projects.
It was inspired by [react-scripts](https://www.npmjs.com/package/react-scripts), which is used by Create React App to simplify configuration and tooling upgrades.

# Usage

```
yarn add --dev @amanda-mitchell/node-project-scripts
```

That's it!

# How it works

`node-project-scripts` has an install script that will create configuration files for all relevant tools that point to full configurations inside `node-project-scripts` itself. This allows configuration changes in `node-project-scripts` to be propagated to all its dependents without any extra upgrade steps.

# What's included

- eslint and configuration
- prettier and configuration
- lint-staged with configuration to run eslint and prettier
- commitlint and configuration
- husky with configuration to run lint-staged and commitlint on commit

# Things that might be added in the future

- jest and configuration
- Typescript and configuration

# Issuing a new release

GitHub actions is configured to run `semantic-release` whenever new commits are pushed to the `main` branch.
As long as commits are tagged with appropriate prefixes, new releases will be published automatically.
