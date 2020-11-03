const gulp = require('gulp');
const gulpReplace = require('gulp-replace');
const gulpBase64 = require('gulp-html-img64');
const FileUtils = require('../utils/file');
const fs = require('fs');
const fst = require('../../utils/fst');

const checkLock = (dir, lockFile) => {
    return FileUtils.existsSync(dir + '/' + lockFile);
}

const templateTask = (program) => {
    let outputDir = program.output;
    let templateDir = `${program.templateDir}/tpl`;
    let lockFile = `${program.platform}.lock`;
    let replaces = program.replaceList;
    let imagebase64 = program.imagebase64;
    let force = program.force;
    if (force || !checkLock(outputDir, lockFile)) {
        return function () {
            fst.writeFileSync(outputDir + '/' + lockFile, "template lock file");
            var task = gulp.src([templateDir + '/**/*']);
            replaces.forEach(replace => {
                if (replace instanceof Array) {
                    task = task.pipe(gulpReplace(...replace));
                }
            });
            if (imagebase64) {
                task = task.pipe(gulp.dest(outputDir));
                task = task.pipe(gulpBase64());
            }
            task = task.pipe(gulp.dest(outputDir));
            return task;
        }
    } else {
        return function (done) {
            done();
        }
    }
}

module.exports = {
    templateTask
}
