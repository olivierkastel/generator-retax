'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var updateExport = require('../../helpers/updateIndex').updateExport;

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('routeName', {desc: 'The route name (eg. user)', type: String, required: true});
    this.capitalizedRouteName = _.upperFirst(_.camelCase(this.routeName));

    this.containerName = `${_.capitalize(this.routeName)}Page`;
    this.indexContainerName = `${_.capitalize(this.routeName)}IndexPage`;

    this.selectorName = `${_.capitalize(this.routeName)}PageSelector`;
    this.indexSelectorName = `${_.capitalize(this.routeName)}IndexPageSelector`;

    this.componentName = `Wrapper${_.capitalize(this.routeName)}Page`;
    this.indexComponentName = `Wrapper${_.capitalize(this.routeName)}IndexPage`;

    this.routeNameConstant = _.toUpper(_.snakeCase(this.routeName));
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
      },
      {
        type: 'confirm',
        name: 'selector',
        message: 'Should the component container include reselect?',
        default: true
      }
    ], function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  _updateOrCopyRouteIndex() {
    const exportObject = this.answers.asyncRoute ?
      `gen${this.capitalizedRouteName}Route` :
      `${this.routeName}Route`;

    updateExport.bind(this)('src/routes/routes.js', {
      templateFile: 'routeIndex.js',
      templateOptions: {
        routeName: this.routeName,
        capitalizedRouteName: this.capitalizedRouteName,
        asyncRoute: this.answers.asyncRoute
      },
      exportRegex: new RegExp(`export { default as ${exportObject} } from '\\.\\/${this.routeName}';`, 'g'),
      exportString: `export { default as ${exportObject} } from './${this.routeName}';\n`
    });
  },

  _updateOrCopyRouteConstantIndex() {
    updateExport.bind(this)('src/constants/routes.js', {
      templateFile: 'indexRouteConstant.js',
      templateOptions: {
        routeNameConstant: this.routeNameConstant,
        routeValue: this.answers.routeValue
      },
      exportRegex: new RegExp(`export const ${this.routeNameConstant} = '${this.answers.routeValue}';`, 'g'),
      exportString: `export const ${this.routeNameConstant} = '${this.answers.routeValue}';\n`
    });
  },

  _copyRouteIndex() {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/routes/${this.routeName}/index.js`),
      {
        scaffoldChildRoutes: this.answers.scaffoldChildRoutes,
        scaffoldIndexRoute: this.answers.scaffoldIndexRoute,

        asyncRoute: this.answers.asyncRoute,

        routeAccessLevel: this.answers.routeAccessLevel,

        routeName: this.routeName,
        routeNameConstant: this.routeNameConstant,

        containerName: this.containerName,
        indexContainerName: this.indexContainerName
      }
    );
  },

  _copyIndexRouteIndex() {
    this.fs.copyTpl(
      this.templatePath('indexRoute.js'),
      this.destinationPath(`src/routes/${this.routeName}/indexRoute.js`),
      {
        asyncRoute: this.answers.asyncRoute,
        routeName: this.routeName
      }
    );
  },

  _copyRoute() {
    this._updateOrCopyRouteConstantIndex();
    this._copyRouteIndex();

    if (this.answers.scaffoldIndexRoute) {
      this._copyIndexRouteIndex();
    }
  },

  _copyContainerPage() {
    this.fs.copyTpl(
      this.templatePath(`container/page/ContainerPage.js`),
      this.destinationPath(`src/routes/${this.routeName}/container/page/${this.containerName}.js`),
      {
        routeName: this.routeName,

        redux: this.answers.redux,
        pureRender: this.answers.pureRender,
        selector: this.answers.selector,

        containerName: this.containerName,
        componentName: this.componentName,
        selectorName: this.selectorName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`container/page/__tests__/ContainerPage-test.js`),
      this.destinationPath(`src/routes/${this.routeName}/container/page/__tests__/${this.containerName}-test.js`),
      {
        redux: this.answers.redux,
        pureRender: this.answers.pureRender,

        componentName: this.componentName,
        containerName: this.containerName
      }
    );
    this.fs.copyTpl(
      this.templatePath('container/page/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/container/page/index.js`),
      {
        containerName: this.containerName
      }
    );
  },

  _copyContainerIndexPage() {
    this.fs.copyTpl(
      this.templatePath(`container/indexRoute/ContainerIndexPage.js`),
      this.destinationPath(`src/routes/${this.routeName}/container/indexRoute/${this.indexContainerName}.js`),
      {
        routeName: this.routeName,

        redux: this.answers.redux,
        pureRender: this.answers.pureRender,
        selector: this.answers.selector,

        indexContainerName: this.indexContainerName,
        indexComponentName: this.indexComponentName,
        indexSelectorName: this.indexSelectorName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`container/indexRoute/__tests__/ContainerIndexPage-test.js`),
      this.destinationPath(`src/routes/${this.routeName}/container/indexRoute/__tests__/${this.indexContainerName}-test.js`),
      {
        redux: this.answers.redux,
        pureRender: this.answers.pureRender,

        indexContainerName: this.indexContainerName,
        indexComponentName: this.indexComponentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('container/indexRoute/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/container/indexRoute/index.js`),
      {
        indexContainerName: this.indexContainerName
      }
    );
  },

  _copyContainerIndex() {
    this.fs.copyTpl(
      this.templatePath('container/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/container/index.js`),
      {
        scaffoldIndexRoute: this.answers.scaffoldIndexRoute,

        containerName: this.containerName,
        indexContainerName: this.indexContainerName
      }
    );
  },

  _copyContainer() {
    this._copyContainerPage();

    if (this.answers.scaffoldIndexRoute) {
      this._copyContainerIndexPage();
    }

    this._copyContainerIndex();
  },

  _copyComponentPage() {
    this.fs.copyTpl(
      this.templatePath(`component/page/WrapperPage.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/page/${this.componentName}.js`),
      {
        pureRender: this.answers.pureRender,

        componentName: this.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`component/page/__tests__/WrapperPage-test.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/page/__tests__/${this.componentName}-test.js`),
      {
        pureRender: this.answers.pureRender,

        componentName: this.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('component/page/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/component/page/index.js`),
      {
        componentName: this.componentName
      }
    );
  },

  _copyComponentIndexPage() {
    this.fs.copyTpl(
      this.templatePath(`component/indexRoute/ComponentIndexPage.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/indexRoute/${this.indexComponentName}.js`),
      {
        pureRender: this.answers.pureRender,

        indexComponentName: this.indexComponentName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`component/indexRoute/__tests__/ComponentIndexPage-test.js`),
      this.destinationPath(`src/routes/${this.routeName}/component/indexRoute/__tests__/${this.indexComponentName}-test.js`),
      {
        pureRender: this.answers.pureRender,

        indexComponentName: this.indexComponentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('component/indexRoute/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/component/indexRoute/index.js`),
      {
        indexComponentName: this.indexComponentName
      }
    );
  },

  _copyComponentIndex() {
    this.fs.copyTpl(
      this.templatePath('component/index.js'),
      this.destinationPath(`src/routes/${this.routeName}/component/index.js`),
      {
        scaffoldIndexRoute: this.answers.scaffoldIndexRoute,

        componentName: this.componentName,
        indexComponentName: this.indexComponentName
      }
    );
  },

  _copyComponents() {
    this._copyComponentPage();

    if (this.answers.scaffoldIndexRoute) {
      this._copyComponentIndexPage();
    }

    this._copyComponentIndex();
  },

  _copyContainerSelector() {
    this.fs.copyTpl(
      this.templatePath(`selector/page/ContainerSelector.js`),
      this.destinationPath(`src/routes/${this.routeName}/selector/page/${this.selectorName}.js`),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(`selector/page/index.js`),
      this.destinationPath(`src/routes/${this.routeName}/selector/page/index.js`),
      {
        selectorName: this.selectorName
      }
    );
  },

  _copyContainerIndexSelector() {
    this.fs.copyTpl(
      this.templatePath(`selector/indexRoute/IndexPageSelector.js`),
      this.destinationPath(`src/routes/${this.routeName}/selector/indexRoute/${this.indexSelectorName}.js`),
      {}
    );

    this.fs.copyTpl(
      this.templatePath(`selector/indexRoute/index.js`),
      this.destinationPath(`src/routes/${this.routeName}/selector/indexRoute/index.js`),
      {
        indexSelectorName: this.indexSelectorName
      }
    );
  },

  _copySelectorIndex() {
    this.fs.copyTpl(
      this.templatePath(`selector/index.js`),
      this.destinationPath(`src/routes/${this.routeName}/selector/index.js`),
      {
        scaffoldIndexRoute: this.answers.scaffoldIndexRoute,

        selectorName: this.selectorName,
        indexSelectorName: this.indexSelectorName
      }
    );
  },

  _copySelector() {
    this._copyContainerSelector();

    if (this.answers.scaffoldIndexRoute) {
      this._copyContainerIndexSelector();
    }

    this._copySelectorIndex();
  },

  writing: function () {
    this._copyRoute();

    this._copyContainer();

    this._copyComponents();

    if (this.answers.selector) {
      this._copySelector();
    }

    this._updateOrCopyRouteIndex();
  },

  end: function () {
    this.log('The route has been initialized.');
  }
});
