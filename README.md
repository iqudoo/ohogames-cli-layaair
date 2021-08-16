# ohogames-cli-layaair
> A layaair game library

### CLI

#### create new project
```
> ohogames-cli-layaair create
```

#### build
```
> ohogames-cli-layaair
  Usage: ohogames-cli-layaair build [options]
    --build-config     build config file, default: ohogames-build.json
    --input            input dir
    --output           output dir
    --outputVersion    [Optional] output dir with version
    --version          [Optional] version default from package.json
    --projectname      [Optional] project name
    --platform         [Optional] project template name
    --indexfile        [Optional] index.html file default: index.html
    --cssfile          [Optional] cssfile default: index.css
    --bgcolor          [Optional] html body bg color
    --jsfile           [Optional] jsfile default: code.js
    --jschunk          [Optional] jschunk default: code.chunk.js
    --jsunpack         [Optional] jsunpack default: code.unpack.js
    --plugins          [Optional] use plugin name list
    --injection        [Optional] injection js file
    --injection-append [Optional] injection append js file
    --res-copy         [Optional] copy res RegEx, default: res/**/*
    --res-exclude      [Optional] exclude res RegEx
    --mainfest-name    [Optional] mainfest.json file name, default: asset-mainfest.json
    --imgbase64        [Optional] html image base64
    --zip              [Optional] [bool] zip build.zip
    --zip-name         [Optional] [bool] zip name, default:build.zip
    --min              [Optional] [bool] uglify js
    --minchunk         [Optional] [bool] uglify chunk js
    --mergeunpack      [Optional] [bool] merge unpack js
    --force            [Optional] [bool] ignore template lock file
    --r-xx             [Optional] replace template value
    --x                [Optional] show this help
```

### Development 
* make sure latest `node.js` installed
* release a version by: `npm version patch|minor|major`