'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('skip-install', {
      desc: 'Whether dependencies should be installed',
      defaults: false
    });

    this.option('skip-install-message', {
      desc: 'Whether commands run should be shown',
      defaults: false
    });

    this.argument('appname', {type: String, required: true});
    this.appname = _.camelCase(this.appname);

    this.sourceRoot(path.join(path.dirname(this.resolved), 'templates/react-seed'));
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Out of the box I include ' + chalk.red('React-seed')));

    this.prompt({
      type: 'input',
      name: 'repourl',
      message: 'Your Repo Url',
      default: 'https://github.com/user/' + this.appname
    }, function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      [
        this.templatePath('**/*'),
        this.templatePath('**/.*')
      ],
      this.destinationPath(),
      {
        appname: this.appname,
        repourl: this.answers.repourl
      }
    );

    var packageJson = this.fs.read('package.json');
    var manifest = JSON.parse(packageJson.toString());
    manifest.name = this.appname;

    this.write('package.json', JSON.stringify(manifest, null, 2));
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-install-message']
    });
  },

  end: function () {
    this.log('React-seed has been installed.');
  }
});
