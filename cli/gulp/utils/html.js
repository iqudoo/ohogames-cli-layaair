var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

function find_meta_list(html, config) {
    let $ = cheerio.load(html);
    return $(config.selector).map(function (i, elem) {
        return {
            key: $(elem).attr(config.key),
            value: $(elem).attr(config.value)
        }
    }).toArray().filter(item => {
        return item.key && item.value;
    });
}

function find_value(html, config, def) {
    let $ = cheerio.load(html);
    let list = $(config.selector).map(function (i, elem) {
        if (!config.attribute) {
            return $(elem).text();
        } else {
            return $(elem).attr(config.attribute);
        }
    }).toArray();
    if (list.length > 0) {
        return list[list.length - 1];
    }
    return def;
}

function find_local_files(html, config) {
    let $ = cheerio.load(html);
    return $(config.selector).map(function (i, elem) {
        let flag = true;
        if (config.filter) {
            Object.keys(config.filter).forEach(key => {
                if ($(elem).has(key)) {
                    let fil = config.filter[key];
                    if (fil instanceof Array) {
                        flag = flag && fil.indexOf($(elem).attr(key)) >= 0;
                    } else {
                        flag = flag && $(elem).attr(key) == fil;
                    }
                } else {
                    flag = flag && !config.filter[key];
                }
            });
        }
        if (config.exclude) {
            Object.keys(config.exclude).forEach(key => {
                if ($(elem).has(key)) {
                    let exc = config.exclude[key];
                    if (exc instanceof Array) {
                        flag = flag && exc.indexOf($(elem).attr(key)) < 0;
                    } else {
                        flag = flag && $(elem).attr(key) != exc;
                    }
                } else {
                    flag = flag && !!config.exclude[key];
                }
            });
        }
        return flag ? $(elem).attr(config.attribute) : undefined;
    }).toArray().filter(function (item) {
        return (item !== undefined && item.substring(0, 4) !== 'http' && item.substring(0, 2) !== '//');
    }).map(function (item) {
        let cwd = config.cwd ? config.cwd : path.dirname(config.file);
        return path.join(cwd, item);
    });
};

function find_remote_files(html, config) {
    let $ = cheerio.load(html);
    return $(config.selector).map(function (i, elem) {
        let flag = true;
        if (config.filter) {
            Object.keys(config.filter).forEach(key => {
                if ($(elem).has(key)) {
                    let filter = config.filter[key];
                    if (filter instanceof Array) {
                        flag = flag && exclude.indexOf($(elem).attr(key)) >= 0;
                    } else {
                        flag = flag && $(elem).attr(key) == filter;
                    }
                } else {
                    flag = flag && !config.filter[key];
                }
            });
        }
        if (config.exclude) {
            Object.keys(config.exclude).forEach(key => {
                if ($(elem).has(key)) {
                    let exclude = config.exclude[key];
                    if (exclude instanceof Array) {
                        flag = flag && exclude.indexOf($(elem).attr(key)) < 0;
                    } else {
                        flag = flag && $(elem).attr(key) != exclude;
                    }
                } else {
                    flag = flag && !!config.exclude[key];
                }
            });
        }
        return flag ? $(elem).attr(config.attribute) : undefined;
    }).toArray().filter(function (item) {
        return item.substring(0, 4) === 'http' || item.substring(0, 2) === '//';
    });
}

function readValue(config, def = '') {
    let html = fs.readFileSync(config.file, 'utf8');
    return find_value(html, config, def);
}

function readMetaList(config) {
    let html = fs.readFileSync(config.file, 'utf8');
    return find_meta_list(html, config);
}

function readLocalFiles(config) {
    let html = fs.readFileSync(config.file, 'utf8');
    return find_local_files(html, config);
}

function readRemoteFiles(config) {
    let html = fs.readFileSync(config.file, 'utf8');
    return find_remote_files(html, config);
}

module.exports = {
    readValue, readMetaList, readLocalFiles, readRemoteFiles
}