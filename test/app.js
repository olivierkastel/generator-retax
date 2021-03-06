'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-target:app', function () {
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
      'api/server.js',
      'docker-compose.yml',
      'Dockerfile',
      'LICENSE',
      'README.md',
      'src/actions/__tests__/app-test.js',
      'src/actions/__tests__/counter-test.js',
      'src/actions/__tests__/session-test.js',
      'src/actions/__tests__/user-test.js',
      'src/actions/app.js',
      'src/actions/counter.js',
      'src/actions/errors.js',
      'src/actions/index.js',
      'src/actions/lifecycle.js',
      'src/actions/session.js',
      'src/actions/settings.js',
      'src/actions/theme.js',
      'src/actions/user.js',
      'src/api/CounterApi/__tests__/CounterApi-test.js',
      'src/api/CounterApi/CounterApi.js',
      'src/api/CounterApi/index.js',
      'src/api/index.js',
      'src/api/SessionApi/__tests__/SessionApi-test.js',
      'src/api/SessionApi/index.js',
      'src/api/SessionApi/SessionApi.js',
      'src/api/UserApi/__tests__/UserApi-test.js',
      'src/api/UserApi/index.js',
      'src/api/UserApi/UserApi.js',
      'src/clientEntry.js',
      'src/components/AccessChecker/__tests__/AccessChecker-test.js',
      'src/components/AccessChecker/AccessChecker.js',
      'src/components/AccessChecker/index.js',
      'src/components/CardsList/__tests__/CardsList-test.js',
      'src/components/CardsList/CardsList.js',
      'src/components/CardsList/index.js',
      'src/components/CardsList/styles.js',
      'src/components/ErrorManager/__tests__/ErrorManager-test.js',
      'src/components/ErrorManager/ErrorManager.js',
      'src/components/ErrorManager/index.js',
      'src/components/ErrorManager/styles.js',
      'src/components/index.js',
      'src/components/LeftMenuDrawer/__tests__/LeftMenuDrawer-test.js',
      'src/components/LeftMenuDrawer/__tests__/routing-stubs.js',
      'src/components/LeftMenuDrawer/index.js',
      'src/components/LeftMenuDrawer/LeftMenuDrawer.js',
      'src/components/LinkItem/__tests__/LinkItem-test.js',
      'src/components/LinkItem/index.js',
      'src/components/LinkItem/LinkItem.js',
      'src/components/LinksList/__tests__/LinksList-test.js',
      'src/components/LinksList/index.js',
      'src/components/LinksList/LinksList.js',
      'src/components/LoginCard/__tests__/LoginCard-test.js',
      'src/components/LoginCard/index.js',
      'src/components/LoginCard/LoginCard.js',
      'src/components/LoginForm/__tests__/LoginForm-test.js',
      'src/components/LoginForm/index.js',
      'src/components/LoginForm/LoginForm.js',
      'src/components/LoginForm/styles.js',
      'src/components/LoginForm/validationRules.js',
      'src/components/SessionInfo/__tests__/SessionInfo-test.js',
      'src/components/SessionInfo/index.js',
      'src/components/SessionInfo/SessionInfo.js',
      'src/components/SessionInfo/styles.js',
      'src/components/UserInfo/__tests__/UserInfo-test.js',
      'src/components/UserInfo/index.js',
      'src/components/UserInfo/styles.js',
      'src/components/UserInfo/UserInfo.js',
      'src/components/WelcomeCard/__tests__/WelcomeCard-test.js',
      'src/components/WelcomeCard/index.js',
      'src/components/WelcomeCard/styles.js',
      'src/components/WelcomeCard/WelcomeCard.js',
      'src/components/WithLoading/__tests__/WithLoading-test.js',
      'src/components/WithLoading/index.js',
      'src/components/WithLoading/WithLoading.js',
      'src/config/access.js',
      'src/config/apiServer.js',
      'src/config/errorTranslators.js',
      'src/config/frontEndServer.js',
      'src/config/index.js',
      'src/constants/actions/appActions.js',
      'src/constants/actions/counter.js',
      'src/constants/actions/errorsActions.js',
      'src/constants/actions/index.js',
      'src/constants/actions/sessionActions.js',
      'src/constants/actions/settingsActions.js',
      'src/constants/actions/themeActions.js',
      'src/constants/actions/userActions.js',
      'src/constants/errorCodes.js',
      'src/constants/index.js',
      'src/constants/routes.js',
      'src/decorators/card/__tests__/card-test.js',
      'src/decorators/card/card.js',
      'src/decorators/card/index.js',
      'src/decorators/card/styles.js',
      'src/decorators/fetcher/__tests__/fetcher-test.js',
      'src/decorators/fetcher/fetcher.js',
      'src/decorators/fetcher/index.js',
      'src/decorators/fetcher/runFetchers.js',
      'src/decorators/index.js',
      'src/helpers/auth/__tests__/auth-test.js',
      'src/helpers/auth/auth.js',
      'src/helpers/auth/index.js',
      'src/helpers/components/DevTools/DevTools.js',
      'src/helpers/components/DevTools/index.js',
      'src/helpers/components/index.js',
      'src/helpers/env/index.js',
      'src/helpers/env/readFromEnv.js',
      'src/helpers/index.js',
      'src/helpers/test/actionsMock.js',
      'src/helpers/test/componentsMock.js',
      'src/helpers/test/createMock.js',
      'src/helpers/test/d3Mock.js',
      'src/helpers/test/decoratorsMock.js',
      'src/helpers/test/helpersMock.js',
      'src/helpers/test/index.js',
      'src/helpers/test/materialUiMock.js',
      'src/helpers/test/radiumMock.js',
      'src/helpers/test/reactHelmetMock.js',
      'src/helpers/test/reactListMock.js',
      'src/helpers/test/reactReduxMock.js',
      'src/helpers/test/reactRouterMock.js',
      'src/helpers/test/reactRouterReduxMock.js',
      'src/helpers/test/reduxFormMock.js',
      'src/helpers/test/targetMock.js',
      'src/helpers/test/storesStubs.js',
      'src/helpers/test/victoryMock.js',
      'src/images/favicon/favicon.ico',
      'src/images/logo/logo-192x192.png',
      'src/reducers/__tests__/app-test.js',
      'src/reducers/__tests__/counter-test.js',
      'src/reducers/__tests__/currentSession-test.js',
      'src/reducers/__tests__/currentUser-test.js',
      'src/reducers/app.js',
      'src/reducers/counter.js',
      'src/reducers/currentSession.js',
      'src/reducers/currentUser.js',
      'src/reducers/errors.js',
      'src/reducers/index.js',
      'src/reducers/loading.js',
      'src/reducers/menus.js',
      'src/reducers/settings.js',
      'src/reducers/theme.js',
      'src/target.config.js',
      'src/routes/admin/component/index.js',
      'src/routes/admin/component/indexRoute/__tests__/WrapperAdminIndexPage-test.js',
      'src/routes/admin/component/indexRoute/index.js',
      'src/routes/admin/component/indexRoute/styles.js',
      'src/routes/admin/component/indexRoute/WrapperAdminIndexPage.js',
      'src/routes/admin/component/page/__tests__/WrapperAdminPage-test.js',
      'src/routes/admin/component/page/index.js',
      'src/routes/admin/component/page/WrapperAdminPage.js',
      'src/routes/admin/container/index.js',
      'src/routes/admin/container/indexRoute/__tests__/AdminIndexPage-test.js',
      'src/routes/admin/container/indexRoute/AdminIndexPage.js',
      'src/routes/admin/container/indexRoute/index.js',
      'src/routes/admin/container/page/__tests__/AdminPage-test.js',
      'src/routes/admin/container/page/AdminPage.js',
      'src/routes/admin/container/page/index.js',
      'src/routes/admin/index.js',
      'src/routes/admin/indexRoute.js',
      'src/routes/admin/selector/index.js',
      'src/routes/admin/selector/indexRoute/AdminIndexPageSelector.js',
      'src/routes/admin/selector/indexRoute/index.js',
      'src/routes/admin/selector/page/AdminPageSelector.js',
      'src/routes/admin/selector/page/index.js',
      'src/routes/default/component/index.js',
      'src/routes/default/component/page/__tests__/WrapperDefaultPage-test.js',
      'src/routes/default/component/page/index.js',
      'src/routes/default/component/page/WrapperDefaultPage.js',
      'src/routes/default/container/index.js',
      'src/routes/default/container/page/__tests__/DefaultPage-test.js',
      'src/routes/default/container/page/DefaultPage.js',
      'src/routes/default/container/page/index.js',
      'src/routes/default/index.js',
      'src/routes/index.js',
      'src/routes/info/component/index.js',
      'src/routes/info/component/page/__tests__/WrapperInfoPage-test.js',
      'src/routes/info/component/page/index.js',
      'src/routes/info/component/page/styles.js',
      'src/routes/info/component/page/WrapperInfoPage.js',
      'src/routes/info/container/index.js',
      'src/routes/info/container/page/__tests__/InfoPage-test.js',
      'src/routes/info/container/page/index.js',
      'src/routes/info/container/page/InfoPage.js',
      'src/routes/info/index.js',
      'src/routes/info/selector/index.js',
      'src/routes/info/selector/page/index.js',
      'src/routes/info/selector/page/InfoPageSelector.js',
      'src/routes/root/component/index.js',
      'src/routes/root/component/page/__tests__/WrapperRootPage-test.js',
      'src/routes/root/component/page/index.js',
      'src/routes/root/component/page/WrapperRootPage.js',
      'src/routes/root/container/index.js',
      'src/routes/root/container/makeRootApp/__tests__/makeRootApp-test.js',
      'src/routes/root/container/makeRootApp/index.js',
      'src/routes/root/container/makeRootApp/makeRootApp.js',
      'src/routes/root/container/makeRootApp/styles.js',
      'src/routes/root/container/page/__tests__/RootPage-test.js',
      'src/routes/root/container/page/index.js',
      'src/routes/root/container/page/RootPage.js',
      'src/routes/root/index.js',
      'src/routes/root/redirect.js',
      'src/routes/root/selector/index.js',
      'src/routes/root/selector/makeRootApp/index.js',
      'src/routes/root/selector/makeRootApp/makeRootAppSelector.js',
      'src/routes/root/selector/page/index.js',
      'src/routes/root/selector/page/RootPageSelector.js',
      'src/routes/routes.js',
      'src/routes/signin/component/index.js',
      'src/routes/signin/component/page/__tests__/WrapperSigninPage-test.js',
      'src/routes/signin/component/page/index.js',
      'src/routes/signin/component/page/styles.js',
      'src/routes/signin/component/page/WrapperSigninPage.js',
      'src/routes/signin/container/index.js',
      'src/routes/signin/container/page/__tests__/SigninPage-test.js',
      'src/routes/signin/container/page/index.js',
      'src/routes/signin/container/page/SigninPage.js',
      'src/routes/signin/index.js',
      'src/routes/signin/selector/index.js',
      'src/routes/signin/selector/page/index.js',
      'src/routes/signin/selector/page/SigninPageSelector.js',
      'src/routes/signout/component/index.js',
      'src/routes/signout/component/page/__tests__/WrapperSignoutPage-test.js',
      'src/routes/signout/component/page/index.js',
      'src/routes/signout/component/page/WrapperSignoutPage.js',
      'src/routes/signout/container/index.js',
      'src/routes/signout/container/page/__tests__/SignoutPage-test.js',
      'src/routes/signout/container/page/index.js',
      'src/routes/signout/container/page/SignoutPage.js',
      'src/routes/signout/index.js',
      'src/routes/signout/selector/index.js',
      'src/routes/signout/selector/page/index.js',
      'src/routes/signout/selector/page/SignoutPageSelector.js',
      'src/routes/user/component/index.js',
      'src/routes/user/component/indexRoute/__tests__/WrapperUserIndexPage-test.js',
      'src/routes/user/component/indexRoute/index.js',
      'src/routes/user/component/indexRoute/styles.js',
      'src/routes/user/component/indexRoute/WrapperUserIndexPage.js',
      'src/routes/user/component/page/__tests__/WrapperUserPage-test.js',
      'src/routes/user/component/page/index.js',
      'src/routes/user/component/page/WrapperUserPage.js',
      'src/routes/user/container/index.js',
      'src/routes/user/container/indexRoute/__tests__/UserIndexPage-test.js',
      'src/routes/user/container/indexRoute/index.js',
      'src/routes/user/container/indexRoute/UserIndexPage.js',
      'src/routes/user/container/page/__tests__/UserPage-test.js',
      'src/routes/user/container/page/index.js',
      'src/routes/user/container/page/UserPage.js',
      'src/routes/user/index.js',
      'src/routes/user/indexRoute.js',
      'src/routes/user/selector/index.js',
      'src/routes/user/selector/indexRoute/index.js',
      'src/routes/user/selector/indexRoute/UserIndexPageSelector.js',
      'src/routes/user/selector/page/index.js',
      'src/routes/user/selector/page/UserPageSelector.js',
      'src/selectors/appSelectors.js',
      'src/selectors/counterSelectors.js',
      'src/selectors/currentSessionSelectors.js',
      'src/selectors/currentUserSelectors.js',
      'src/selectors/errorsSelectors.js',
      'src/selectors/index.js',
      'src/selectors/loadingSelectors.js',
      'src/selectors/menuSelectors.js',
      'src/selectors/themeSelectors.js',
      'src/serverEntry.js',
      'src/store/__tests__/asyncAwaitMiddleware-test.js',
      'src/store/asyncAwaitMiddleware.js',
      'src/store/authMiddleware.js',
      'src/store/getMiddlewares.js',
      'src/store/index.js',
      'src/store/undefinedMiddleware.js',
      'src/themes/admin.js',
      'src/themes/index.js',
      'src/themes/user.js',
      'webhooks/build-image.js',
      'webhooks/deploy.js',
      '.babelrc',
      '.builderrc',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      '.gitlab-ci.yml',
      '.jscsrc',
      '.nvmrc',
      '.travis.yml'
    ]);
  });
});
