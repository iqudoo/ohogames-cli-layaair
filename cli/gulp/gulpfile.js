'use strict';
const chalk = require('chalk');
const path = require('path');
const gulp = require('gulp');
const minimist = require('minimist');
const File = require('./utils/file');
const Html = require('./utils/html');
const Empty = require('./tasks/empty');
const Clean = require('./tasks/_1clean');
const Resources = require('./tasks/_2resources');
const Template = require('./tasks/_3template');
const Mergejs = require('./tasks/_5mergejs');
const Mergecss = require('./tasks/_4mergecss');
const Injection = require('./tasks/_6injection');
const Templatetask = require('./tasks/_7templatetask');
const Manifest = require('./tasks/_8manifest');
const Plugins = require('./tasks/_9plugins');
const Zipe = require('./tasks/_10zip');
const program = minimist(process.argv.slice(2), []);

let confPath = path.join((program.bincwd || '.'), program["build-config"] || './ohogames-build.json');
if (File.existsSync(confPath)) {
    Object.assign(program, require(confPath))
}

function init() {

    if (!program.platform) {
        program.platform = 'h5';
    }

    if (!program.cssfile) {
        program.cssfile = 'style.css';
    }

    if (!program.indexfile) {
        program.indexfile = 'index.html';
    }

    if (!program.jsfile) {
        program.jsfile = 'code.js';
    }

    if (!program.jschunk) {
        program.jschunk = 'code.chunk.js';
    }

    if (!program.jsunpack) {
        program.jsunpack = 'code.unpack.js';
    }

    if (program.input) {
        program.input = path.join((program.bincwd || '.') + "/" + program.input);
    }

    if (program.output) {
        program.output = path.join((program.bincwd || '.') + "/" + program.output);
    }

    if (!program.x) {
        console.log(`build to ... `, chalk.green(program.platform));
        console.log('');
    }

    let localTplDir = path.join((program.bincwd || '.'), `ohogames/templates/${program.platform}`);
    let npmTplDir = path.join((program.bincwd || '.'), `node_modules/ohogames-${program.platform}-layaair-template`);
    let innerTplDir = path.join((program.libcwd || '.'), `templates/build/${program.platform}`);
    if (File.existsSync(localTplDir)) {
        program.templateDir = localTplDir;
        return true;
    }
    if (File.existsSync(npmTplDir)) {
        program.templateDir = npmTplDir;
        return true;
    }
    if (File.existsSync(innerTplDir)) {
        program.templateDir = innerTplDir;
        return true;
    }
    return false;

}

function config(htmlFile) {
    let replaceList = [];
    let metaList = Html.readMetaList({ file: htmlFile, selector: 'meta', key: "name", value: "content" });
    metaList.forEach(meta => {
        replaceList.push([`\${${meta.key}}`, meta.value]);
    });
    Object.keys(program).filter(key => {
        return key.indexOf("r-") == 0
    }).forEach(key => {
        replaceList.push([`\${${key.substring(2)}}`, program[key]]);
    });
    let projectname = program.projectname || Html.readValue({ file: htmlFile, selector: 'title' }, "My Game");
    replaceList.push(['${codeJs}', program.jsfile]);
    replaceList.push(['${chunkJs}', program.jschunk]);
    replaceList.push(['${unpackJs}', program.jsunpack]);
    replaceList.push(['${projectName}', projectname]);
    program.replaceList = replaceList;
}

function check() {
    if (!init()) {
        console.log('');
        console.log(chalk.yellow('template not found, platform : ' + program.platform));
        console.log('');
        return false;
    }
    let checkInput = !!program.input;
    let checkOutput = !!program.output;
    let checkIndexfile = false;
    if (checkInput && checkOutput) {
        let indexfile = `${program.input}/${program.indexfile}`;
        checkIndexfile = File.existsSync(indexfile);
        if (checkIndexfile) {
            config(indexfile);
            return true;
        }
    }
    console.log('');
    if (!checkInput) {
        console.log(chalk.yellow('invalid parameters [input]'));
    }
    if (!checkOutput) {
        console.log(chalk.yellow('invalid parameters [output]'));
    }
    if (!checkIndexfile) {
        console.log(chalk.yellow('invalid parameters [indexfile]'));
    }
    console.log('');
    return false;
}

function running() {
    gulp.task('help', Empty.emptyTask(() => {
        console.log("");
        console.log("");
        console.log("Usage: ohogames-cli-layaair build [options]");
        console.log("  --build-config     build config file, def: ohogames-build.json");
        console.log("  --input            input dir");
        console.log("  --output           output dir");
        console.log("  --projectname      [Optional] project name");
        console.log("  --platform         [Optional] project template name");
        console.log("  --indexfile        [Optional] index.html file def: index.html");
        console.log("  --cssfile          [Optional] cssfile def: style.css");
        console.log("  --jsfile           [Optional] jsfile def: code.js");
        console.log("  --jschunk          [Optional] jschunk def: code.chunk.js");
        console.log("  --plugins          [Optional] use plugin name list");
        console.log("  --injection        [Optional] injection js file");
        console.log("  --injection-append [Optional] injection append js file");
        console.log("  --imgbase64        [Optional] html image base64");
        console.log("  --zip              [Optional] [bool] gen zip");
        console.log("  --zip-name         [Optional] [bool] zip name, def:build.zip");
        console.log("  --min              [Optional] [bool] uglify js");
        console.log("  --minchunk         [Optional] [bool] uglify chunk js");
        console.log("  --mergeunpack      [Optional] [bool] merge unpack js");
        console.log("  --force            [Optional] [bool] ignore template lock file");
        console.log("  --r-xx             [Optional] replace template value");
        console.log("  --x                [Optional] show this help");
        console.log("");
        console.log("");
    }));

    gulp.task('clean', Clean.cleanTask(program));

    gulp.task('resources', Resources.resourcesTask(program));

    gulp.task('template', Template.templateTask(program));

    gulp.task('mergeCss', Mergecss.mergeCssTask(program));

    gulp.task('mergeJs', Mergejs.mergeJsTask(program));

    gulp.task('injectJs', Injection.injectTask(program));

    gulp.task('manifestJson', Manifest.manifestTask(program));

    gulp.task('templateTask', Templatetask.templateTask(program));

    gulp.task('pluginsTask', Plugins.pluginTask(program));

    gulp.task('zip', Zipe.zipTask(program))

    gulp.task('build', function (done) {
        let tasks = [];
        if (program.x) {
            tasks.push('help');
        } else {
            tasks.push('clean');
            tasks.push('resources');
            tasks.push('template');
            tasks.push('mergeCss');
            tasks.push('mergeJs');
            tasks.push('injectJs');
            tasks.push('manifestJson');
            tasks.push('templateTask');
            if (program.plugins) {
                tasks.push('pluginsTask');
            }
            if (program.zip) {
                tasks.push('zip');
            }
        }
        return gulp.series(tasks)((error) => {
            done();
            console.log('');
            if (error) {
                console.log(chalk.red(`build error: ${error.message}`));
            } else {
                console.log(chalk.green(`output : ${path.relative(program.bincwd, program.output)}`));
                console.log(chalk.green('build complete.\n'));
            }
            console.log('');
        });
    });
}

if (check()) {
    running();
} else {
    gulp.task('build', function (done) {
        done();
        console.log('');
        console.log(chalk.red('build failure.\n'));
    });
}
