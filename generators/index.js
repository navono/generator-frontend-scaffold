const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });
  }

  end() {
    this.log(chalk.green('------------'))
    this.log(chalk.magenta('***---***'))
    this.log(chalk.blue('Jobs is Done!'))
    this.log(chalk.green('------------'))
    this.log(chalk.magenta('***---***'))
  }
};