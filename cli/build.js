#!/usr/bin/env node
const fst = require('./utils/fst');
const { version, baseVersion } = require('../package.json');
const chalk = require('chalk');
const path = require('path');
const fs = require("fs");
const exec = require('./gulp/lib/exectools');
const libDir = path.join(__dirname, '/../');
const args = process.argv.slice(2);

function _arg(index, def) {
    let val = def;
    if (args.length > index) {
        val = args[index];
    }
    return val;
}

const call = (cwd = '') => {
    console.log(chalk.green('start build...\n'));
    process.argv.push('--libcwd', libDir);
    process.argv.push('--bincwd', process.cwd());
    let gulpfile = path.join(libDir, './cli/gulp/gulpfile.js');
    let gulpcwd = path.join(libDir);
    let cmd = "node node_modules/gulp/bin/gulp.js --gulpfile " + gulpfile + " --cwd " + gulpcwd + " build " + process.argv.slice(3).join(' ');
    exec.shell(cmd, { cwd });
}

console.log('');

let _type = _arg(0, 'default');
if (_type == 'build') {
    let exists = fs.existsSync(path.join(libDir, "node_modules/gulp/bin/gulp.js"));
    call(exists ? libDir : '');
} else if (_type == 'create') {
    let tpl = '';
    let dir = `./${_arg(1, '')}`
    let template = path.join(libDir, `./templates/create`);
    if (!fst.existsSync(template)) {
        console.log(chalk.red(`Failure : template "${tpl}" not found`));
        console.log('');
        return;
    }
    let output = path.join(process.cwd(), dir);
    if (!fst.emptySync(output)) {
        console.log(chalk.red(`Failure : directory "${output}" is not empty, ignore`));
        console.log('');
        return;
    }
    let replaceOpts = {
        '#project-name#': path.basename(process.cwd()) || 'ohogames-project',
        '#ohogames-cli-version#': version || '1.0.0',
        '#ohogames-base-version#': baseVersion || '1.0.0',
    }
    fst.copyDirSync(template, output, (item) => {
        let ext = path.extname(item);
        return ext == '.vue' || ext == '.html' || ext == '.js' || ext == '.laya' || ext == '.json' || ext == '.txt' || ext == '.md' || ext == '.less';
    }, (dst) => dst.replace('npmignore', 'gitignore'), replaceOpts);
    console.log(chalk.green(`Success : ${output}`));
    console.log('');
} else {
    console.log('Usage: ohogames-cli-layaair [options]');
    console.log("       create  -  create a project");
    console.log("       build   -  build project");
    console.log('');
    return;
}






