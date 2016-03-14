'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fullstack-react:component', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/component'))
      .withArguments(['MyComponent'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/components/MyComponent/MyComponent.js',
      'src/components/MyComponent/__tests__/MyComponent-test.js',
      'src/components/MyComponent/index.js',
      'src/components/index.js'
    ]);
  });
});
