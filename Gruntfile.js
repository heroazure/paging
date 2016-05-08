'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            files: ['temp']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: {
                    except: ['require', 'exports', 'module']
                }
            },
            ug:{
                files: [
                    {
                        expand: true,
                        cwd: "develop/js/",
                        src: ["**/*.js","!plugin/**/*"],
                        dest: "public/js/",
                        ext: ".min.js"
                    }]
            }
        },
        qunit: {
            files: ['views/**/*.html','*.html']
        },
        jshint: {
            options: {
                //jshintrc: true
                "asi":true,
                "globals": {
                    "$": false,
                    "jQuery": false
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['js/**/*.js']
            }
        },
        less: {
            development: {
                files: [
                    {
                        expand: true,
                        cwd: "develop/less/",
                        src: ["page/*.less", "{normalize,common,main}.less"],
                        dest: "public/css/dev",
                        ext: ".css"
                    }]
            },
            production: {
                options: {
                    compress: true
                },
                files: [
                    {
                        expand: true,
                        cwd: "develop/less/",
                        src: ["page/*.less", "{normalize,common,main}.less"],
                        dest: "public/css/pub",
                        ext: ".min.css"
                    }]
            }
        },
        imagemin: {
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'develop/img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif,ico}'],   // Actual patterns to match
                    dest: 'public/img/'                  // Destination path prefix
                }]
            }
        },
        copy:{
            vendor: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'develop/vendor/',                   // Src matches are relative to this path
                    src: ['**/*'],   // Actual patterns to match
                    dest: 'public/vendor/'                  // Destination path prefix
                }]
            },
            fonts: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'develop/fonts/',                   // Src matches are relative to this path
                    src: ['**/*'],   // Actual patterns to match
                    dest: 'public/fonts/'                  // Destination path prefix
                }]
            },
            plugin: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'develop/js/plugin/',                   // Src matches are relative to this path
                    src: ['**/*'],   // Actual patterns to match
                    dest: 'public/js/plugin/'                  // Destination path prefix
                }]
            }
        },
        watch: {
            /*gruntfile: {
             files: '<%= jshint.gruntfile.src %>',
             tasks: ['jshint:gruntfile']
             },
             src: {
             files: '<%= jshint.src.src %>',
             tasks: ['jshint:src', 'qunit']
             },*/
            /*test: {
             files: '<%= jshint.test.src %>',
             tasks: ['jshint:test', 'qunit']
             }*/
            less: {
                files: ['develop/less/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cmd-transport');

    // Default task.
    grunt.registerTask('default', ['less','uglify','copy']);

    grunt.registerTask('test', ['jshint', 'qunit', 'clean', 'concat','less', 'uglify']);

};