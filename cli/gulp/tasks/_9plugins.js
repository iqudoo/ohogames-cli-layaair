
const path = require('path');
const gulp = require('gulp');
const chalk = require('chalk');
const file = require('../utils/file');
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
            if (file.existsSync(localPluginFile)) {
                return { pluginName, pluginFile: localPluginFile };
            }
            if (file.existsSync(pluginFile)) {
                return { pluginName, pluginFile };
            }
            let pluginRepo = `ohogames-cli-layaair-${pluginName}`;
            console.log("");
            console.log(`plugin not found : ${chalk.yellow(pluginRepo)}, you can \"${chalk.yellow(`npm install ${pluginRepo}`)}\"`);
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