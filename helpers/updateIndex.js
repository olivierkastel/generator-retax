var htmlWiring = require('html-wiring');

module.exports = {
  updateExport(path, options) {
    const templateFile = options.templateFile;
    const templateOptions = options.templateOptions;
    const exportRegex = options.exportRegex;
    const exportString = options.exportString;

    try {
      var file = htmlWiring.readFileAsString(path);

      if (!exportRegex.test(file)) {
        file = file.replace(/^\s*\n/gm, '');
        file = file.concat(exportString);
      }

      this.write(path, file);
    } catch (e) {
      this.fs.copyTpl(
        this.templatePath(templateFile),
        this.destinationPath(path),
        templateOptions
      );
    }
  }
};
