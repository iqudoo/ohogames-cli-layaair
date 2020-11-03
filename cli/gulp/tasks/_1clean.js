const FileUtils = require('../utils/file');

const checkLock = (dir, lockFile) => {
    return FileUtils.existsSync(dir + '/' + lockFile);
}

const cleanTask = (program) => {
    return (done) => {
        let dir = program.output;
        let lockFile = program.platform + ".lock";
        let force = program.force;
        if (force || !checkLock(dir, lockFile)) {
            FileUtils.deleteFolderSync(dir);
            done();
        } else {
            done();
        }
    }
}

module.exports = {
    cleanTask
}