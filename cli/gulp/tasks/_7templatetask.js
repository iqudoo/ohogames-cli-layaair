const gulp = require('gulp');
const file = require('../utils/file');

function templateTask(program) {
    let customTaskJs = `${program.templateDir}/task.js`;
    if (file.existsSync(customTaskJs)) {
        const { task } = require(customTaskJs);
        let taskName = `template-${program.platform}`;
        gulp.task(taskName, task(program));
        return gulp.series([taskName]);
    } else {
        return emptyTask();
    }
}

module.exports = {
    templateTask
}