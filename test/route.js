'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fullstack-react:route', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/route'))
      .withPrompts({scaffoldIndexRoute: true})
      .withArguments(['user'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/constants/routes/user.js',
      'src/constants/routes/index.js',
      'src/routes/user/index.js',
      'src/routes/user/container/index.js',
      'src/routes/user/container/UserPage.js',
      'src/routes/user/container/__tests__/UserPage-test.js',
      'src/routes/user/component/wrapper/index.js',
      'src/routes/user/component/wrapper/WrapperUserPage.js',
      'src/routes/user/component/wrapper/__tests__/WrapperUserPage-test.js',
      'src/routes/user/component/index/index.js',
      'src/routes/user/component/index/UserPageIndex.js',
      'src/routes/user/component/index/__tests__/UserPageIndex-test.js',
      'src/routes/user/selector/index.js',
      'src/routes/user/selector/UserPageSelector.js'
    ]);
  });
});
