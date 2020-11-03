const FileUtils = require('../utils/file');
const gulp = require('gulp');
const zip = require('gulp-zip');

const zipTask = (program) => {
    let output = program.output;
    let zipName = program['zip-name'] || "build.zip";
    return function () {
        FileUtils.deleteFileSync(`${output}/${zipName}`);
        return gulp.src(`${output}/**/*`)
            .pipe(zip(zipName))
            .pipe(gulp.dest(output));
    }
}

module.exports = {
    zipTask
}
