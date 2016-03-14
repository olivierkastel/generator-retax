'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');
var updateExport = require('../../helpers/updateIndex').updateExport;

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('selectorName', {desc: 'The selector name (eg. errors)', type: String, required: true});
    this.selectorName = _.camelCase(this.selectorName);
  },

  prompting: function () {
    this.log(yosay('I will scaffold a selector'));
  },

  _copySelector() {
    this.fs.copyTpl(
      this.templatePath(`selector.js`),
      this.destinationPath(`src/selectors/${this.selectorName}.js`),
      {
        selectorName: this.selectorName
      }
    );
    this.fs.copyTpl(
      this.templatePath(`__tests__/selector-test.js`),
      this.destinationPath(`src/selectors/__tests__/${this.selectorName}-test.js`),
      {
        selectorName: this.selectorName
      }
    );
  },

  _updateOrCopySelectorIndex() {
    updateExport.bind(this)('src/selectors/index.js', {
      templateFile: 'index.js',
      templateOptions: {
        selectorName: this.selectorName
      },
      exportRegex: new RegExp(`export \\* from '\\.\\/${this.selectorName}';`, 'g'),
      exportString: `export * from './${this.selectorName}';`
    });
  },

  writing: function () {
    this._copySelector();
    this._updateOrCopySelectorIndex();
  },

  end: function () {
    this.log('The selector has been initialized.');
  }
});
