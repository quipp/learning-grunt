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
        }
    });

    grunt.loadNpmTasks("grunt-typescript");

    grunt.registerTask("default", ['typescript']);
}
