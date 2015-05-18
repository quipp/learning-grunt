'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            options: {
                module: 'commonjs'
            },
            common: {
                src: ['./www/PlsRemindMe.Web/js/*.ts'],
                dest: './www/PlsRemindMe.Web/js/_output/plsRemindMe.common.js'
            },
            binders: {
                src: ['./www/PlsRemindMe.Web/js/binders/*.ts'],
                dest: './www/PlsRemindMe.Web/js/_output/plsRemindMe.binders.js'
            },
            models: {
                src: ['./www/PlsRemindMe.Web/js/models/*.ts'],
                dest: './www/PlsRemindMe.Web/js/_output/plsRemindMe.models.js'
            },
            viewModels: {
                src: ['./www/PlsRemindMe.Web/js/viewModels/*.ts'],
                dest: './www/PlsRemindMe.Web/js/_output/plsRemindMe.viewModels.js'
            }
        },
        jshint: {
            options: {
                //force: true
                '-W069': false, // Failure from typescript enum
                '-W004': false, // Failure from typescript inheritance
                '-W058': false, // Failure from typescript missing invoking constructor.
                reporterOutput: './jshint.txt'
            },
            files: ['./www/PlsRemindMe.web/js/_output/*.js']
        },
        uglify: {
            development: {
                files: [{
                    expand: true,
                    cwd: './www/PlsRemindMe.Web/js/_output/',
                    src: '**/*.js',
                    dest: './www.PlsRemindMe.Web/js/_output/'
                }]
            },
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                },
                //beautify: true
            }
        },
        clean: {
            options: {

            },
            files: ['./www/PlsRemindMe.Web/js/_output/*'],
            folders: ['./www/PlsRemindMe.Web/js/_output/foo']
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'typescript', 'uglify']); //'jshint', 
}
