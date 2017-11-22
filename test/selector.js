'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-target:selector', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/selector'))
      .withArguments(['errors'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/selectors/errors.js',
      'src/selectors/__tests__/errors-test.js',
      'src/selectors/index.js'
    ]);
  });
});
