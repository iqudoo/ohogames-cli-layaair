const path = require('path');
const gulp = require('gulp');
const gulpCheerio = require('gulp-cheerio');
const FileUtils = require('../utils/file');
const HtmlUtils = require('../utils/html');

const injectTask = (program) => {
    let indexFile = `${program.input}/${program.indexfile}`;
    let htmlFile = program.indexfile;
    let outputDir = program.output;
    let cssFile = program.cssfile;
    let jsFile = program.jsfile;
    let jsChunk = program.jschunk;
    let jsUnpack = program.jsunpack;
    let bgColor = program.bgcolor;
    let mergeUnpack = program.mergeunpack;
    let injectionJs = program.injection;
    let appendInjectionJs = program['injection-append'];
    let force = program.force;
    return (done) => {
        let indexHtml = path.join(outputDir, htmlFile);
        if (FileUtils.existsSync(indexHtml) && force) {
            let pipe = gulp.src(indexHtml);
            if (bgColor) {
                pipe = pipe.pipe(gulpCheerio(function ($) {
                    $('body').css("background-color", "#" + bgColor);
                }))
            }
            if (FileUtils.existsSync(path.join(outputDir, cssFile))) {
                pipe = pipe.pipe(gulpCheerio(function ($) {
                    $('head').append('<link href="' + cssFile + '" rel="prefetch stylesheet">');
                }))
            }
            if (FileUtils.existsSync(path.join(outputDir, jsFile))) {
                pipe = pipe.pipe(gulpCheerio(function ($) {
                    $('body').append('<script src="' + jsFile + '"></script>');
                }))
                if (FileUtils.existsSync(path.join(outputDir, jsChunk))) {
                    pipe = pipe.pipe(gulpCheerio(function ($) {
                        $('body').prepend('<script src="' + jsChunk + '"></script>');
                    }))
                }
                if (mergeUnpack) {
                    if (FileUtils.existsSync(path.join(outputDir, jsUnpack))) {
                        pipe = pipe.pipe(gulpCheerio(function ($) {
                            $('body').prepend('<script src="' + jsUnpack + '"></script>');
                        }))
                    }
                }
            }
            if (!mergeUnpack) {
                var remoteFiles = HtmlUtils.readRemoteFiles({ file: indexFile, selector: 'script', attribute: 'src', filter: { build: 'unpack' } });
                for (let index = 0; index < remoteFiles.length; index++) {
                    pipe = pipe.pipe(gulpCheerio(function ($) {
                        $('body').prepend('<script src="' + remoteFiles[index] + '"></script>');
                    }))
                }
            }
            if (injectionJs) {
                pipe = pipe.pipe(gulpCheerio(function ($) {
                    let jsList = injectionJs.split(',');
                    jsList.reverse();
                    jsList.forEach(js => {
                        $('body').prepend('<script src="' + js + '"></script>');
                    });
                }))
            }
            if (appendInjectionJs) {
                pipe = pipe.pipe(gulpCheerio(function ($) {
                    let jsList = appendInjectionJs.split(',');
                    jsList.forEach(js => {
                        $('body').append('<script src="' + js + '"></script>');
                    });
                }))
            }
            return pipe.pipe(gulp.dest(outputDir));
        } else {
            done();
        }
    };
}

module.exports = {
    injectTask
}