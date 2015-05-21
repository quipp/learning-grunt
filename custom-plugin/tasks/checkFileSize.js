/*
 * grunt-checkFileSize
 * https://github.com/quipp/learning-grunt
 *
 * Copyright (c) 2015 Jason M. Dudley
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    function dumpDebugInformation(target) {
        var options = target.options();
        var files = target.files;

        if (!options.debug) {
            return;
        }

        grunt.log.writeln('Running Target: ' + target.target);
        grunt.log.writeflags(options, 'Target Options');

        target.filesSrc.forEach(function(filepath) {
            grunt.log.writeln('Configured Folder: ' + filepath);
        });
    }

    function verifyFolderExists(folderPath) {
        if (folderPath === '' || folderPath === undefined) {
            grunt.fail.fatal('The provided folderToScan was empty or not provided.');
        }
        if (!grunt.file.exists(folderPath)) {
            grunt.fail.fatal('The provided folderToScan was not found.');
        }
        if (!grunt.file.isDir(folderPath)) {
            grunt.fail.fatal('The provided folderToScan was not a folder.');
        }
    }

    function checkFileSizes(target) {
        target.filesSrc.forEach(function(folderPath) {
            if (grunt.file.isDir(folderPath)) {
                grunt.file.recurse(folderPath, function(abspath, rootdir, subdir, filename) {
                    if (grunt.file.isFile(abspath)) {
                        var stats = fs.statSync(abspath);
                        var asBytes = stats.size / 1024;
                        grunt.log.writeln('Found %s with size of %s kb', filename, asBytes);
                    }
                });
            }
        });
    }

    grunt.registerMultiTask('checkFileSize', 'The best Grunt plugin ever.', function() {
        var options = this.options({
            debug: false
        });

        dumpDebugInformation(this);

        //verifyFolderExists(options.folderToScan);

        checkFileSizes(this);
    });

};
