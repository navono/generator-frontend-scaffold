const Generator = require('yeoman-generator');
const chalk = require('chalk');

/**
 * The complete priority methods:
 *  initializing  : the method's initialization for example the initial state of the project, initial configs, etc.
 *  prompting -: CLI prompt for options to the user.
 *  configuring :  To save project configs and save metadata.
 *  default :  Usable when a method doesn't merge with application priority.
 *  writing :  It's responsible to write the specifics files of a generator for example: template, routes, etc.
 *  conflicts :  Handler for conflicts(internal use).
 *  install :  Where the install methods are called(npm, bower, go get).
 *  end : Last method to call we can put finish messages, cleanup, etc.
 */

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });
  }

  // Async Await
  async prompting() {
    this.answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname, // appname return the default folder name to project
      store: true,
    },
    {
      type: 'list',
      name: 'templateType',
      message: 'Select the template you want:',
      choices: ['React Project', 'React Project that need publish to nexus']
    }]);
  }

  install() {
    // this.addDependencies({ dependency: 'version' });
    // this.addDevDependencies({ dependency: 'version' });
  }

  initializing() {
    if (this.options.appname === 'ohmy') {
      this._writingEasterEgg()
    }
  }

  writing() {
    if (this.answers.templateType === 'React Project') {
      this._writingReactTemplate();
    }
    // else if (this.answers.templateType === 'React Project that need publish to nexus') {
    //   this._writingApiTemplate()
    // }
    // else {
    //   this._writingReactTemplate()
    //   this._writingApiTemplate()
    // }
  }

  end() {
    this.log(chalk.green('------------'))
    this.log(chalk.magenta('***---***'))
    this.log(chalk.blue('Jobs is Done!'))
    this.log(chalk.green('------------'))
    this.log(chalk.magenta('***---***'))
  }

  _writingReactTemplate() {
    this.fs.copy(
      this.templatePath('react-project'),
      this.destinationPath('./')
    )
    this.fs.copyTpl(
      this.templatePath('react-project/public/index.html'),
      this.destinationPath('./public/index.html'),
      { title: this.answers.name } // Embedded JavaScript templating.
    )
  }

  _writingApiTemplate() {
    this.fs.copy(
      this.templatePath('api'),
      this.destinationPath('./')
    )
  }

  _writingEasterEgg() {
    this.log(` 
      ___  _____
    .'/,-Y"     "~-.
    l.Y             ^.
    /\               _\_
   i            ___/"   "\\
   |          /"   "\\   o !
   l         ]     o !__./
    \\ _  _    \.___./    "~\\
     X \/ \\            ___./
    ( \\ ___.   _..--~~"   ~.-.
      Z,--   /               \\
       \\__.  (   /       ______)
         \\   l  /-----~~" /
          Y   \          /
          |    "x______.^
          |           \\
          j            Y `)
  }
};