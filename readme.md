Run this before you run cordova build

## Install

```sh
$ npm install --save-dev gulp-ionic-config-xml
```

## Add the following to your gulpfile

```js
gulp.task('config', require('gulp-ionic-config-xml'));
```
## Usage
```sh
$ gulp config --appId="com.new.id"
$ gulp config --appName="newApp"
$ gulp config --version="1.0.0"
$ gulp config --build="1.0.0"
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
