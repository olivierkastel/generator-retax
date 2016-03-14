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
      'src/routes/user/container/page/UserPage.js',
      'src/routes/user/container/page/__tests__/UserPage-test.js',
      'src/routes/user/container/page/index.js',
      'src/routes/user/container/index/UserIndexPage.js',
      'src/routes/user/container/index/__tests__/UserIndexPage-test.js',
      'src/routes/user/container/index/index.js',
      'src/routes/user/container/index.js',
      'src/routes/user/component/page/WrapperUserPage.js',
      'src/routes/user/component/page/__tests__/WrapperUserPage-test.js',
      'src/routes/user/component/page/index.js',
      'src/routes/user/component/index/WrapperUserIndexPage.js',
      'src/routes/user/component/index/__tests__/WrapperUserIndexPage-test.js',
      'src/routes/user/component/index/index.js',
      'src/routes/user/component/index.js',
      'src/routes/user/selector/page/UserPageSelector.js',
      'src/routes/user/selector/page/index.js',
      'src/routes/user/selector/index/UserIndexPageSelector.js',
      'src/routes/user/selector/index/index.js',
      'src/routes/user/selector/index.js',
      'src/routes/routes.js'
    ]);
  });
});
