const FileUtils = require('../utils/file');

const emptydirTask = (program) => {
    return (done) => {
        FileUtils.deleteEmptySync(program.output);
        done();
    }
}

module.exports = {
    emptydirTask
}