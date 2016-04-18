'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');
var updateExport = require('../../helpers/updateIndex').updateExport;

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('actionCreatorName', {desc: 'The action creator name (eg. errors)', type: String, required: true});

    this.actionCreatorName = _.camelCase(this.actionCreatorName);
    this.ActionCreatorName = `${_.upperFirst(_.camelCase(this.actionCreatorName))}ActionsCreator`;
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay('I will scaffold a action creator'));

    this.prompt([
      {
        type: 'input',
        name: 'firstActionConstant',
        message: 'What is the name of the first action of this action creator?',
        default: 'DEFAULT_ACTION'
      }
    ], function (answers) {
      this.answers = answers;
      this.answers.firstAction = _.camelCase(this.answers.firstActionConstant);
      done();
    }.bind(this));
  },

  _copyActionConstant() {
    this.fs.copyTpl(
      this.templatePath(`actionConstants.js`),
      this.destinationPath(`src/constants/actions/${this.actionCreatorName}.js`),
      {
        firstActionConstant: this.answers.firstActionConstant
      }
    );
  },

  _updateOrCopyConstantIndex() {
    updateExport.bind(this)('src/constants/actions/index.js', {
      templateFile: 'actionConstantsIndex.js',
      templateOptions: {
        actionCreatorName: this.actionCreatorName
      },
      exportRegex: new RegExp(`export \\* from '\\.\\/${this.actionCreatorName}';`, 'g'),
      exportString: `export * from './${this.actionCreatorName}';`
    });
  },

  _copyActionCreator() {
    this.fs.copyTpl(
      this.templatePath(`actionCreators.js`),
      this.destinationPath(`src/actions/${this.actionCreatorName}.js`),
      {
        firstActionConstant: this.answers.firstActionConstant,
        ActionCreatorName: this.ActionCreatorName,
        firstAction: this.answers.firstAction,
        actionCreatorName: this.actionCreatorName
      }
    );

    this.fs.copyTpl(
      this.templatePath(`__tests__/actionCreators-test.js`),
      this.destinationPath(`src/actions/__tests__/${this.actionCreatorName}-test.js`),
      {
        actionCreatorName: this.actionCreatorName,
        ActionCreatorName: this.ActionCreatorName,

        firstActionConstant: this.answers.firstActionConstant,
        firstAction: this.answers.firstAction
      }
    );
  },

  _updateOrCopyActionCreatorIndex() {
    updateExport.bind(this)('src/actions/index.js', {
      templateFile: 'actionIndex.js',
      templateOptions: {
        actionCreatorName: this.actionCreatorName,
        ActionCreatorName: this.ActionCreatorName
      },
      exportRegex: new RegExp(`export { default as ${this.ActionCreatorName} } from '\\.\\/${this.actionCreatorName}';`, 'g'),
      exportString: `export { default as ${this.ActionCreatorName} } from './${this.actionCreatorName}';`
    });
  },

  writing: function () {
    this._copyActionConstant();
    this._updateOrCopyConstantIndex();
    this._copyActionCreator();
    this._updateOrCopyActionCreatorIndex();
  },

  end: function () {
    this.log('The action creator has been initialized.');
  }
});
