'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var htmlWiring = require('html-wiring');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('selectorName', {desc: 'The selector name (eg. errors)', type: String, required: true});
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
  },

  _updateOrCopySelectorIndex() {
    try {
      var file = htmlWiring.readFileAsString('src/selectors/index.js');

      if (!new RegExp(`export \\* from '\\.\\/${this.selectorName}';`, 'g').test(file)) {
        file = file.replace(/^\s*\n/gm, '');
        file = file.concat(`export * from './${this.selectorName}';`);
      }

      this.write('src/selectors/index.js', file);
    } catch (e) {
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('src/selectors/index.js'),
        {
          selectorName: this.selectorName
        }
      );
    }
  },

  writing: function () {
    this._copySelector();
    this._updateOrCopySelectorIndex();
  },

  end: function () {
    this.log('The selector has been initialized.');
  }
});
