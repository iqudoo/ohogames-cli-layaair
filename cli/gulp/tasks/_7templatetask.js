const gulp = require('gulp');
const chalk = require('chalk');
const fst = require('../../utils/fst');

function templateTaskBefore(program) {
    return function (done) {
        try {
            let customTaskJs = `${program.templateDir}/task.js`;
            if (fst.existsSync(customTaskJs)) {
                const { taskBefore } = require(customTaskJs);
                if (taskBefore && typeof taskBefore === "function") {
                    taskBefore(gulp, program, done);
                } else {
                    done();
                }
            } else {
                done();
            }
        } catch (error) {
            console.log("");
            console.log("call custom pre: " + chalk.yellow(error));
            console.log("");
            done();
        }
    }
}

function templateTaskAfter(program) {
    return function (done) {
        try {
            let customTaskJs = `${program.templateDir}/task.js`;
            if (fst.existsSync(customTaskJs)) {
                const { taskMain } = require(customTaskJs);
                if (taskMain && typeof taskMain === "function") {
                    taskMain(gulp, program, done);
                } else {
                    done();
                }
            } else {
                done();
            }
        } catch (error) {
            console.log("");
            console.log("call custom main: " + chalk.yellow(error));
            console.log("");
            done();
        }
    }
}

module.exports = {
    templateTaskBefore,
    templateTaskAfter
}