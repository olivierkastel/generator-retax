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

    this.argument('appName', {type: String, required: true});
    this.kebabComponentName = _.kebabCase(this.appName);
    this.appName = _.upperFirst(_.camelCase(this.appName));

    this.sourceRoot(path.join(path.dirname(this.resolved), 'templates/target-seed'));
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Out of the box I include ' + chalk.red('target-seed')));

    this.prompt([
      {
        type: 'input',
        name: 'repoUrl',
        message: 'Your Repo Url',
        default: 'https://github.com/user/' + this.appName
      }, {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: 'User'
      }
    ]).then(function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  writing: function () {
    function renameSeed(file) {
      file = file.toString();
      return file.replace(/targetSeed/g, this.appName);
    }

    this.fs.copy(
      [
        this.templatePath('**/*'),
        this.templatePath('**/.*')
      ],
      this.destinationPath(),
      {
        process: renameSeed.bind(this),
        globOptions: {
          ignore: [
            '**/package.json/**',
            '**/.git/**'
          ]
        }
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        appName: this.appName,
        repoUrl: this.answers.repoUrl,
        author: this.answers.author
      }
    );

    var packageJson = this.fs.read('package.json');
    var manifest = JSON.parse(packageJson.toString());
    manifest.name = this.kebabComponentName;
    manifest.version = '0.0.0';

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
    this.log('target-seed has been installed.');
  }
});
