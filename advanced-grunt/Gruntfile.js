/*global module:false*/
var fs = require('fs');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        nodeunit: {
            files: ['test/**/*_test.js']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'nodeunit']
            }
        },
        checkFileSize: {
            options: {
                folderToScan: "./files"
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit', 'checkFileSize']);

    // Custom task
    grunt.registerTask('checkFileSize', 'Task to check file size', function(debug) {
        var options = this.options({
            folderToScan: ''
        });

        if (this.args.length !== 0 && debug !== undefined) {
            grunt.log.writeflags(options, 'Options');
        }

        grunt.file.recurse(options.folderToScan, function(abspath, rootdir, subdir, filename) {
            if (grunt.file.isFile(abspath)) {
                var stats = fs.statSync(abspath);
                var asBytes = stats.size / 1024;
                grunt.log.writeln("Found %s with size of %s kb", filename, asBytes);
            }
        });
    });

};
