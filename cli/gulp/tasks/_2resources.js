var gulp = require('gulp');

function unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                ++i;
            }
        }
        newArr.push(arr[i]);
    }
    return newArr;
}

function resourcesTask(program) {
    return function () {
        let inputPath = program.input;
        let outputDir = program.output;
        let resInclude = unique(`${program["res-copy"] || "res/**/*"}`.split(",").filter(item => {
            return !!item;
        })).map(item => {
            return inputPath + "/**/" + item;
        });
        return gulp.src([inputPath + "/**/*", "!" + inputPath + "/**/*.js", ...resInclude.map(item => "!" + item)]).pipe(gulp.dest(outputDir))
            .pipe(gulp.src(resInclude))
            .pipe(gulp.dest(outputDir))
    }
}

module.exports = {
    resourcesTask
}