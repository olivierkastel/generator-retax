'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-retax:seed-component', function () {
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
      'playground/clientEntry.tsx',
      'playground/index.html',
      'README.md',
      'src/index.ts',
      'src/styles.ts',
      'tsconfig.json',
      'tslint.json',
      'types/playground.d.ts',
      'typings.json',
      '.babelrc',
      '.builderrc',
      '.editorconfig',
      '.gitignore',
      '.gitlab-ci.yml',
      '.npmignore',
      '.nvmrc',
      '.travis.yml',
      'src/MyComp.tsx',
      'src/MyComp.example',
      'src/__tests__/MyComp-test.tsx'
    ]);
  });
});
