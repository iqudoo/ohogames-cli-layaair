const downloadLib = require('download');

function downloadFile(url, dir, filename) {
    return downloadLib(url, dir, { filename });
}

function download(list, dir, callback) {
    Promise.all(list.map(item => {
        return downloadFile(item.url, dir, item.name);
    })).then(() => {
        callback && callback();
    })
}

module.exports = {
    download
}