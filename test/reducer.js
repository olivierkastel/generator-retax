'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fullstack-react:reducer', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/reducer'))
      .withArguments(['errors'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/reducers/errors.js',
      'src/reducers/__tests__/errors-test.js',
      'src/reducers/index.js'
    ]);
  });
});
