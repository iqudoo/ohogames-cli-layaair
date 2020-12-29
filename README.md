# ohogames-cli-layaair
> A layaair game library

### CLI

#### create new project
```
> ohogames-cli-layaair create
```

#### build
```
> layaair-tape
  Usage: ohogames-cli-layaair build [options]
    --build-config     build config file, def: ohogames-build.json
    --input            input dir
    --output           output dir
    --projectname      [Optional] project name
    --platform         [Optional] project template name
    --indexfile        [Optional] index.html file def: index.html
    --cssfile          [Optional] cssfile def: style.css
    --jsfile           [Optional] jsfile def: code.js
    --jschunk          [Optional] jschunk def: code.chunk.js
    --jsunpack         [Optional] jsunpack def: code.unpack.js
    --plugins          [Optional] use plugin name list
    --injection        [Optional] injection js file
    --injection-append [Optional] injection append js file
    --res-copy         [Optional] copy res RegEx, def: res/**/*
    --mainfest-name    [Optional] mainfest.json file name, def: asset-mainfest.json
    --imgbase64        [Optional] html image base64
    --zip              [Optional] [bool] zip build.zip
    --zip-name         [Optional] [bool] zip name, def:build.zip
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