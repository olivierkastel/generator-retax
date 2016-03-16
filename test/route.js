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
      'src/constants/routes.js',
      'src/routes/user/index.js',
      'src/routes/user/container/page/UserPage.js',
      'src/routes/user/container/page/__tests__/UserPage-test.js',
      'src/routes/user/container/page/index.js',
      'src/routes/user/container/indexRoute/UserIndexPage.js',
      'src/routes/user/container/indexRoute/__tests__/UserIndexPage-test.js',
      'src/routes/user/container/indexRoute/index.js',
      'src/routes/user/container/index.js',
      'src/routes/user/component/page/WrapperUserPage.js',
      'src/routes/user/component/page/__tests__/WrapperUserPage-test.js',
      'src/routes/user/component/page/index.js',
      'src/routes/user/component/indexRoute/WrapperUserIndexPage.js',
      'src/routes/user/component/indexRoute/__tests__/WrapperUserIndexPage-test.js',
      'src/routes/user/component/indexRoute/index.js',
      'src/routes/user/component/index.js',
      'src/routes/user/selector/page/UserPageSelector.js',
      'src/routes/user/selector/page/index.js',
      'src/routes/user/selector/indexRoute/UserIndexPageSelector.js',
      'src/routes/user/selector/indexRoute/index.js',
      'src/routes/user/selector/index.js',
      'src/routes/routes.js'
    ]);
  });
});
