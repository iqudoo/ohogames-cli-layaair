
const path = require('path');
const gulp = require('gulp');
const chalk = require('chalk');
const fst = require('../../utils/fst');
const { emptyTask } = require('./empty');

function pluginTask(program) {
    let tasks = [];
    let plugins = `${program.plugins || ""}`.split(",").filter((plugin) => {
        return !!plugin;
    });
    if (plugins.length > 0) {
        plugins.map(pluginName => {
            let localPluginFile = path.join((program.bincwd || '.'), `.ohogames-cli/plugins/${pluginName}.js`);
            let pluginFile = path.join((program.bincwd || '.'), `node_modules/ohogames-cli-layaair-${pluginName}/plugin.js`);
            if (fst.existsSync(localPluginFile)) {
                return { pluginName, pluginFile: localPluginFile };
            }
            if (fst.existsSync(pluginFile)) {
                return { pluginName, pluginFile };
            }
            console.log("");
            console.log("plugin not found : " + chalk.yellow(pluginName));
            console.log("");
            return {};
        }).forEach(({ pluginName, pluginFile }) => {
            if (pluginFile) {
                const { plugin } = require(pluginFile);
                let taskName = `plugin-${pluginName}`;
                gulp.task(taskName, plugin(program));
                tasks.push(taskName);
            }
        });
        return gulp.series(tasks);
    } else {
        return emptyTask();
    }
}

module.exports = {
    pluginTask
}