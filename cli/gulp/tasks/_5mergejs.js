const HtmlUtils = require('../utils/html');
const FileUtils = require('../utils/file');
const UUID = require('../utils/uuid');
const path = require('path');
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpUglify = require('gulp-uglify');
const gulpReplace = require('gulp-replace');
const { download } = require('../utils/down');

const _files = {
    chunk: [],
    unpack: [],
    default: []
}

const downloadRemoteJs = (htmlFile, tempDir, type) => {
    return (done) => {
        var key = type || 'default';
        if (!_files[key]) {
            _files[key] = [];
        }
        var remoteFiles = HtmlUtils.readRemoteFiles({ file: htmlFile, selector: 'script', attribute: 'src', filter: { build: type } });
        var downloads = [];
        remoteFiles.forEach(file => {
            let fileName = ".js_temp/" + UUID.gid() + ".js";
            _files[key].push(tempDir + '/' + fileName);
            downloads.push({
                url: file,
                name: fileName
            });
        });
        if (downloads.length > 0) {
            download(downloads, tempDir, done);
        } else {
            done();
        }
    }
}

const mergeJs = (htmlFile, outputDir, jsFile, uglify, babel, replaces = [], type) => {
    return (done) => {
        var key = type || 'default';
        if (!_files[key]) {
            _files[key] = [];
        }
        var loadFiles = [..._files[key]];
        loadFiles.push(...HtmlUtils.readLocalFiles({ file: htmlFile, selector: 'script', attribute: 'src', filter: { build: type } }));
        if (loadFiles.length > 0) {
            var task = gulp.src(loadFiles);
            if (uglify) {
                task = task.pipe(gulpUglify());
            }
            task = task.pipe(gulpConcat(jsFile))
            replaces.forEach(replace => {
                if (replace instanceof Array) {
                    task = task.pipe(gulpReplace(...replace));
                }
            });
            return task.pipe(gulp.dest(outputDir));
        } else {
            FileUtils.createFileSync(path.join(outputDir, jsFile), "console.log(\"empty file: " + jsFile + "\")");
            done();
        }
    }
}

const cleanTemp = (outputDir) => {
    return (done) => {
        FileUtils.deleteFolderSync(outputDir + '/.js_temp');
        done();
    }
}

const mergeJsTask = (program) => {
    let htmlFile = `${program.input}/${program.indexfile}`;
    let outputDir = program.output;
    let jsFile = program.jsfile;
    let jsChunk = program.jschunk;
    let jsUnpack = program.jsunpack;
    let uglify = program.min;
    let chunkUglify = program.minchunk;
    let babel = program.babel;
    let chunkBabel = program.babelchunk;
    let replaces = program.replaceList;
    gulp.task('mergeJs-downloadRemoteJs', downloadRemoteJs(htmlFile, outputDir, undefined));
    gulp.task('mergeJs-mergeJs', mergeJs(htmlFile, outputDir, jsFile, uglify, babel, replaces, undefined));
    gulp.task('mergeJs-downloadChunkRemoteJs', downloadRemoteJs(htmlFile, outputDir, "chunk"));
    gulp.task('mergeJs-mergeChunkJs', mergeJs(htmlFile, outputDir, jsChunk, chunkUglify, chunkBabel, replaces, "chunk"));
    gulp.task('mergeJs-downloadUnpackRemoteJs', downloadRemoteJs(htmlFile, outputDir, "unpack"));
    gulp.task('mergeJs-mergeUnpackJs', mergeJs(htmlFile, outputDir, jsUnpack, false, false, [], "unpack"));
    gulp.task('mergeJs-cleanTemp', cleanTemp(outputDir));
    return gulp.series([
        'mergeJs-downloadRemoteJs',
        'mergeJs-mergeJs',
        'mergeJs-downloadChunkRemoteJs',
        'mergeJs-mergeChunkJs',
        'mergeJs-downloadUnpackRemoteJs',
        'mergeJs-mergeUnpackJs',
        'mergeJs-cleanTemp'
    ]);
}

module.exports = {
    mergeJsTask
}