'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var htmlWiring = require('html-wiring');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('componentName', {desc: 'The component name (eg. AccessChecker)', type: String, required: true});
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay('I will scaffold a component'));

    this.prompt([
      {
        type: 'confirm',
        name: 'pureRender',
        message: 'Should the components be pure?',
        default: true
      }
    ], function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  _copyComponent() {
    this.fs.copyTpl(
      this.templatePath(`Component.js`),
      this.destinationPath(`src/components/${this.componentName}/${this.componentName}.js`),
      {
        pureRender: this.answers.pureRender,

        componentName: this.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`__tests__/Component-test.js`),
      this.destinationPath(`src/components/${this.componentName}/__tests__/${this.componentName}-test.js`),
      {
        pureRender: this.answers.pureRender,

        componentName: this.componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/components/${this.componentName}/index.js`),
      {
        componentName: this.componentName
      }
    );
  },

  _updateOrCopyComponentIndex() {
    try {
      var file = htmlWiring.readFileAsString('src/components/index.js');

      if (!new RegExp(`export { default as ${this.componentName} } from '\\.\\/${this.componentName}';`, 'g').test(file)) {
        file = file.replace(/^\s*\n/gm, '');
        file = file.concat(`export { default as ${this.componentName} } from './${this.componentName}';`);
      }

      this.write('src/components/index.js', file);
    } catch (e) {
      this.fs.copyTpl(
        this.templatePath('componentIndex.js'),
        this.destinationPath('src/components/index.js'),
        {
          componentName: this.componentName
        }
      );
    }
  },

  writing: function () {
    this._copyComponent();
    this._updateOrCopyComponentIndex();
  },

  end: function () {
    this.log('The component has been initialized.');
  }
});
