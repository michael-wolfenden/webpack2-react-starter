# webpack2-react-starter

Basic React starter template using webpack 2 

[![Build Status][build-badge]][build]
[![License][license-badge]][license]

## Getting started

This will install all npm packages and the  validate the install by running the linter and tests

    > npm run setup

## Development

This will run a live reload server at http://localhost:8080/index.html

    > npm start

## Testing

Runs Karma and watches for changes to re-run tests. To add a unit test, simply create a `.specs.js` file anywhere in `~/src`. Karma will pick up on these files automatically. Mocha will be available within your test without the need to import it.

    > npm test

## Production build

Runs linter, tests, and then on success, compiles your application to `~/dist`

    > npm run production

## Git Hooks

A pre-commit hook has been enabled (using pre-commit) that runs eslint and then tests before any commit.

## Libraries

### Testing

+ [karma](https://github.com/karma-runner/karma) - Test Runner for JavaScript
+ [enzyme](https://github.com/airbnb/enzyme) - JavaScript Testing utilities for React
+ [power-assert](https://github.com/power-assert-js/power-assert) -  Provides descriptive assertion messages through standard assert interface
* [phantomjs](https://github.com/Medium/phantomjs) - Headless website testing

### React

* [babel-react-optimize](https://github.com/thejameskyle/babel-react-optimize) - A Babel preset and plugins for optimizing React code.

### Other

+ [webpack](https://github.com/webpack/webpack) - A bundler for javascript and friends
+ [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/) - ES2015 pollyfils
+ [pre-commit](https://github.com/observing/pre-commit) - A pre-commit hook installer for git. It will ensure that your npm test (or other specified scripts) passes before you can commit your changes.
+ [npm-run-all](https://www.npmjs.com/package/npm-run-all) - A CLI tool to run multiple npm-scripts in parallel or sequential.

[build-badge]: https://travis-ci.org/michael-wolfenden/webpack2-react-starter.svg?style=flat-square
[build]: https://travis-ci.org/michael-wolfenden/webpack2-react-starter
[license-badge]: https://img.shields.io/github/license/michael-wolfenden/webpack2-react-starter.svg?style=flat-square
[license]: https://raw.githubusercontent.com/michael-wolfenden/webpack2-react-starter/master/LICENSE
