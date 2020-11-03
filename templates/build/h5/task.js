function taskBefore(gulp, params, callback) {
    callback();
}

function taskMain(gulp, params, callback) {
    callback();
}

module.exports = {
    taskBefore,
    taskMain
}