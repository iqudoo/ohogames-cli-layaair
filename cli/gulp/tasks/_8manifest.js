const path = require('path');
const HtmlUtils = require('../utils/html');
const FileUtils = require('../utils/file');

function manifestTask(program) {
    return function (done) {
        let manifestFiles = [];
        let htmlFile = path.join(program.output, program.indexfile);
        let manifestFile = path.join(program.output, "manifest.json");
        manifestFiles.push(...HtmlUtils.readRemoteFiles({ file: htmlFile, selector: 'script', attribute: 'src' }));
        manifestFiles.push(...HtmlUtils.readLocalFiles({ file: htmlFile, selector: 'script', attribute: 'src' }));
        manifestFiles.push(...HtmlUtils.readRemoteFiles({ file: htmlFile, selector: 'link', attribute: 'href', filter: { rel: 'stylesheet' } }));
        manifestFiles.push(...HtmlUtils.readLocalFiles({ file: htmlFile, selector: 'link', attribute: 'href', filter: { rel: 'stylesheet' } }));
        FileUtils.writeFileSync(manifestFile, JSON.stringify(manifestFiles.map((filePath) => {
            return path.relative(program.output, filePath);
        }), null, 2))
        done();
    };
}

module.exports = {
    manifestTask
}