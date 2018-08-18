'use strict';
var vfs = require('vinyl-fs');
var args = require("yargs").argv;
var fs = require("fs");
var gutil = require('gutil');
var filter = require("gulp-filter");
var xeditor = require("gulp-xml-transformer");
/*
 * main functions -----------------------
 */

function cordovaConfig() { }

cordovaConfig.prototype.run = function () {

  if (args.appId) {
    return this.id(args.appId);
  } else if (args.appName) {
    return this.name(args.appName)
  } else if (args.version) {
    return this.version(args.version)
  } else if (args.build) {
    return this.build(args.build)
  } else {
    return this.help();
  }
};

cordovaConfig.prototype.name = function (newName) {
  this.pluginMessage();
  console.log(newName);
  return vfs.src(['./config.xml'])
    .pipe(vfs.dest('./'))
    .pipe(xeditor([{
      path: '//xmlns:name',
      text: newName
    }], 'http://www.w3.org/ns/widgets'))
    .pipe(vfs.dest("./"));
}

cordovaConfig.prototype.desc = function (newDesc) {
  this.pluginMessage();
  console.log(newDesc);
  return vfs.src(['./config.xml'])
    .pipe(vfs.dest('./'))
    .pipe(xeditor([{
      path: '//xmlns:description',
      text: newDesc
    }], 'http://www.w3.org/ns/widgets'))
    .pipe(vfs.dest("./"));
}

cordovaConfig.prototype.version = function (newVersion) {
  this.pluginMessage();
  console.log(newVersion);
  this.pluginMessage();
  return vfs.src(['./config.xml'])
    .pipe(vfs.dest('./'))
    .pipe(xeditor([{
      path: '.',
      attr: {
        'version': newVersion
      }
    }]))
    .pipe(vfs.dest("./"));
}

cordovaConfig.prototype.build = function (newBuild) {
  this.pluginMessage();
  console.log(newBuild);
  this.pluginMessage();
  return vfs.src(['./config.xml'])
    .pipe(vfs.dest('./'))
    .pipe(xeditor([{
      path: '.',
      attr: {
        'ios-CFBundleVersion': newBuild
      }
    }]))
    .pipe(vfs.dest("./"));
}

cordovaConfig.prototype.id = function (newId) {
  this.pluginMessage();
  return vfs.src(['./config.xml'])
    .pipe(vfs.dest('./'))
    .pipe(xeditor([{
      path: '.',
      attr: {
        'id': newId
      }
    }]))
    .pipe(vfs.dest("./"));
}


/*
 * helper functions -----------------------
 */

cordovaConfig.prototype.pluginMessage = function () {
  gutil.log("\nRemember to run cordova build after this\n");
}

cordovaConfig.prototype.help = function () {
  gutil.log('\n\tUSAGE:\n\t\t$ gulp config --appId="com.new.id"\n\t\t$ gulp config --appName="newName"\n\t\t$ gulp config --version="newVersion"\n');
}

/*
 * module function -----------------------
 */

var init = new cordovaConfig();
module.exports = function () {
  return init.run();
};
