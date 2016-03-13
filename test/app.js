'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fullstack-react:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({'skip-install': true, 'skip-install-message': true})
      .withArguments(['myProject'])
      .withPrompts({repourl: 'https://github.com/user/myProject'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.babelrc'
    ]);
  });
});
