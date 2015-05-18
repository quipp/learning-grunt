'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlhint: {
            templates: {
                options: {
                    'attr-lower-case': true,
                    'attr-value-not-empty': true,
                    'tag-pair': true,
                    'tag-self-close': true,
                    'tagname-lowercase': true,
                    'id-class-value': true,
                    'id-class-unique': true,
                    'src-not-empty': true,
                    'img-alt-required': true
                },
                src: ['www/PlsRemindMe.Web/Templates/**/*.html']
            }
        },
        less: {
            development: {
                options: {
                    cleancss: true,
                    compress: false,
                    modifyVars: {
                        'color-primary-dark-blue': 'NOT_BLUE'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'www/PlsRemindMe.Web/Content/',
                    dest: 'www/PlsRemindMe.Web/Content/',
                    src: ['plsremind.me.*.less'],
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['htmlhint', 'less']);
}
