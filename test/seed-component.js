'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fullstack-react:seed-component', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/seed-component'))
      .withOptions({'skip-install': true, 'skip-install-message': true})
      .withArguments(['MyComp'])
      .withPrompts({repoUrl: 'https://github.com/user/myProject', author: 'Me'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'LICENSE',
      'npm-shrinkwrap.json',
      'playground/clientEntry.js',
      'playground/index.html',
      'README.md',
      'src/index.js',
      'src/styles.js',
      '.babelrc',
      '.builderrc',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      '.gitlab-ci.yml',
      '.jscsrc',
      '.nvmrc',
      '.travis.yml',
      'src/MyComp.js',
      'src/MyComp.example',
      'src/__tests__/MyComp-test.js'
    ]);
  });
});
