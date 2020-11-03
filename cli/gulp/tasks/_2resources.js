var gulp = require('gulp');

const getResources1 = (dir) => {
    return [
        dir + '/**/*.*',
        // exclude
        '!' + dir + '/**/res/**/*',
        '!' + dir + '/**/*.js'
    ];
}

const getResources2 = (dir) => {
    return [
        // res
        dir + '/**/res/**/*'
    ];
}

const resourcesTask = (program) => {
    return function () {
        let inputPath = program.input;
        let outputDir = program.output;
        return gulp.src(getResources1(inputPath))
            .pipe(gulp.dest(outputDir))
            .pipe(gulp.src(getResources2(inputPath)))
            .pipe(gulp.dest(outputDir))
    }
}

module.exports = {
    resourcesTask
}