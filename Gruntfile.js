module.exports = grunt =>
{
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    
    var path = require('path');
    
    grunt.initConfig({
        paths: {
            dist: {
                main: "dist",
                css: "dist/css"
            },
            compiling: {
                css: "src/compiling/css"
            },
            src: {
                css: "src/scss"
            }
        },
        clean: {
            main: {
                src: ["<%= paths.dist.main %>"]
            },
            css: {
                src: ["<%= paths.dist.css %>/**/*"]
            },
            js: {
                src: ["<%= paths.dist.js %>/**/*", "<% paths.compiling.css %>/**/*"]
            }
        },
        copy: {
            css: {
                expand: true,
                cwd: "<%= paths.compiling.css %>",
                src: ["libs.*", "main.*"],
                dest: "<%= paths.dist.css %>"
            },
            js: {
                expand: true,
                cwd: "<%= paths.compiling.js %>",
                src: ["libs.*", "main.*"],
                dest: "<%= paths.dist.js %>"
            },
        },
        sass: {
            dev: {
                options: {
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        src: ['main.scss'],
                        cwd: '<%= paths.src.css %>',
                        dest: '<%= paths.compiling.css %>',
                        ext: '.css'
                    }
                ]
            }
        },
    });
    
    var buildCss = [
        'clean:css', 'sass:dev', 'copy:css'
    ];
    grunt.registerTask('css', function () {
        return grunt.task.run(buildCss);
    });
    
    var buildJs = [
        "clean:js", "concat:jslibs", "uglify:jslibs", "concat:js", "uglify:js", "copy:js"
    ];
};