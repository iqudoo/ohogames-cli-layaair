
const path = require('path');
const gulp = require('gulp');
const chalk = require('chalk');
const fst = require('../../utils/fst');

function pluginTask(program) {
    return function (done) {
        let plugins = (program.plugins || "").split(",");
        Promise.all(plugins.map(pluginName => {
            let localPluginFile = path.join((program.bincwd || '.'), `ohogames/plugins/${pluginName}.js`);
            let pluginFile = path.join((program.bincwd || '.'), `node_modules/ohogames-${pluginName}-layaair-plugin/plugin.js`);
            if (fst.existsSync(localPluginFile)) {
                return localPluginFile;
            }
            if (fst.existsSync(pluginFile)) {
                return pluginFile;
            }
            console.log("");
            console.log("plugin not found : " + chalk.yellow(pluginName));
            console.log("");
            return "";
        }).filter(pluginFile => {
            return !!pluginFile;
        }).map((pluginFile) => {
            return new Promise((resole, reject) => {
                try {
                    const { pluginMain } = require(pluginFile);
                    pluginMain(gulp, program, resole);
                } catch (error) {
                    reject("call plugin task: " + chalk.yellow(error) + " \npath:" + pluginFile);
                }
            })
        })).catch(error => {
            console.log("");
            console.log(error);
            console.log("");
        }).then(() => {
            done();
        })
    }
}

module.exports = {
    pluginTask
}