'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fullstack-react:action', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/action-creator'))
      .withArguments(['errors'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/constants/actions/errors.js',
      'src/constants/actions/index.js',
      'src/actions/errors.js',
      'src/actions/__tests__/errors-test.js',
      'src/actions/index.js'
    ]);
  });
});
