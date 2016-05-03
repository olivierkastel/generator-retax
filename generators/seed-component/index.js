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

    this.argument('componentName', {type: String, required: true});
    this.kebabComponentName = _.kebabCase(this.componentName);
    this.componentName = _.upperFirst(_.camelCase(this.componentName));

    this.sourceRoot(path.join(path.dirname(this.resolved), 'templates/react-component-seed'));
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Out of the box I include ' + chalk.red('react-component-seed')));

    this.prompt([
      {
        type: 'input',
        name: 'repoUrl',
        message: 'Your Repo Url',
        default: 'https://github.com/user/' + this.componentName
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
    function renameComponent(file) {
      file = file.toString();
      return file.replace(/SeedComponent/g, this.componentName);
    }

    this.fs.copy(
      [
        this.templatePath('**/*'),
        this.templatePath('**/.*')
      ],
      this.destinationPath(),
      {
        process: renameComponent.bind(this),
        globOptions: {
          ignore: [
            '**/package.json/**',
            '**/.git/**',
            '**/SeedComponent*'
          ]
        }
      }
    );

    this.fs.copy(
      this.templatePath('src/SeedComponent.tsx'),
      this.destinationPath(`src/${this.componentName}.tsx`),
      {
        process: renameComponent.bind(this)
      }
    );

    this.fs.copy(
      this.templatePath('src/SeedComponent.example'),
      this.destinationPath(`src/${this.componentName}.example`),
      {
        process: renameComponent.bind(this)
      }
    );

    this.fs.copy(
      this.templatePath('src/__tests__/SeedComponent-test.tsx'),
      this.destinationPath(`src/__tests__/${this.componentName}-test.tsx`),
      {
        process: renameComponent.bind(this)
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        componentName: this.componentName,
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
    this.log('react-component-seed has been installed.');
  }
});
