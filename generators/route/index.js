'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('routeName', {desc: 'The route name (eg. user)', type: String, required: true});
    this.containerName = `${_.capitalize(this.routeName)}Page`;
    this.componentName = `Wrapper${_.capitalize(this.routeName)}Page`;
    this.indexRouteName = `${_.capitalize(this.routeName)}PageIndex`;
    this.routeNameConstant = _.upperCase(this.routeName);
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay('I will scaffold a route'));

    this.prompt([
      {
        type: 'input',
        name: 'routeValue',
        message: 'What is the url of the route',
        default: `/${this.routeName}`
      },
      {
        type: 'confirm',
        name: 'asyncRoute',
        message: 'Should this route be asynchronous?',
        default: true
      },
      {
        type: 'list',
        name: 'routeAccessLevel',
        message: 'What is the required access level',
        choices: ['public', 'user', 'admin'],
        default: 0
      },
      {
        type: 'confirm',
        name: 'scaffoldChildRoutes',
        message: 'Will this route have child route?',
        default: false
      },
      {
        type: 'confirm',
        name: 'scaffoldIndexRoute',
        message: 'Will this route have an IndexRoute?',
        default: false
      },
      {
        type: 'confirm',
        name: 'pureRender',
        message: 'Should the components be pure?',
        default: true
      },
      {
        type: 'confirm',
        name: 'redux',
        message: 'Should the component container include redux?',
        default: true
      }
    ], function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  _copyRoute() {
    this.fs.copyTpl(
      this.templatePath('routeConstant.js'),
      this.destinationPath(`src/constants/routes/${this.routeName}.js`),
      {
        routeNameConstant: this.routeNameConstant,
        routeValue: this.answers.routeValue
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/routes/${this.routeName}/index.js`),
      {
        asyncRoute: this.answers.asyncRoute,
        scaffoldChildRoutes: this.answers.scaffoldChildRoutes,
        scaffoldIndexRoute: this.answers.scaffoldIndexRoute,
        routeNameConstant: this.routeNameConstant,
        containerName: this.containerName,
        routeName: this.routeName,
        routeAccessLevel: this.answers.routeAccessLevel,
        indexRouteName: this.indexRouteName
      }
    );
  },

  _copyContainer() {
    this.fs.copyTpl(
      this.templatePath(`container/ContainerPage.js`),
      this.destinationPath(`src/routes/${this.routeName}/container/${this.containerName}.js`),
      {
        redux: this.answers.redux,
        pureRender: this.answers.pureRender,
        componentName: this.componentName,
        containerName: this.containerName,
        routeName: this.routeName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`container/__tests__/ContainerPage-test.js`),
      this.destinationPath(`src/routes/${this.routeName}/container/__tests__/${this.containerName}-test.js`),
      {
        redux: this.answers.redux,
        pureRender: this.answers.pureRender,
        componentName: this.componentName,
        containerName: this.containerName
      }
    );
    this.fs.copyTpl(
      this.templatePath('container/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/container/index.js`),
      {
        containerName: this.containerName
      }
    );
  },

  _copyComponents() {
    this.fs.copyTpl(
      this.templatePath(`component/wrapper/WrapperContainerPage.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/wrapper/${this.componentName}.js`),
      {
        pureRender: this.answers.pureRender,
        componentName: this.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`component/wrapper/__tests__/WrapperContainerPage-test.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/wrapper/__tests__/${this.componentName}-test.js`),
      {
        pureRender: this.answers.pureRender,
        componentName: this.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('component/wrapper/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/component/wrapper/index.js`),
      {
        componentName: this.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('component/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/component/index.js`),
      {
        componentName: this.componentName,
        scaffoldIndexRoute: this.answers.scaffoldIndexRoute,
        indexRouteName: this.indexRouteName
      }
    );
  },

  _copyIndexRoute() {
    this.fs.copyTpl(
      this.templatePath(`component/index/IndexRoute.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/index/${this.indexRouteName}.js`),
      {
        pureRender: this.answers.pureRender,
        indexRouteName: this.indexRouteName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`component/index/__tests__/IndexRoute-test.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/index/__tests__/${this.indexRouteName}-test.js`),
      {
        pureRender: this.answers.pureRender,
        indexRouteName: this.indexRouteName
      }
    );
    this.fs.copyTpl(
      this.templatePath('component/index/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/component/index/index.js`),
      {
        indexRouteName: this.indexRouteName
      }
    );
  },

  writing: function () {
    this._copyRoute();
    this._copyContainer();
    this._copyComponents();

    if (this.answers.scaffoldIndexRoute) {
      this._copyIndexRoute();
    }
  },

  end: function () {
    this.log('The route has been initialized.');
  }
});
