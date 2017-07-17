module.exports = grunt =>
{
    require("load-grunt-tasks")(grunt);
    require("time-grunt")(grunt);
    
    var path = require("path"),
        buildCss = [
            "clean:css", "sass:dev", "cssmin", "copy:css", "clean:compiling-css"
        ],
        buildJs = [
            "jshint:dev",
            "clean:js",
            "webpack:build",
            "uglify:js",
            "copy:js",
            //"clean:compiling-js",
        ];
    
    grunt.initConfig({
        paths: {
            dist: {
                main: "dist",
                css: "dist/css",
                js: "dist/js",
            },
            compiling: {
                css: "src/compiling/css",
                js: "src/compiling/js"
            },
            src: {
                css: "src/scss",
                js: "src/js",
            }
        },
        clean: {
            main: {
                src: ["<%= paths.dist.main %>"]
            },
            css: {
                src: ["<%= paths.dist.css %>/**/*"]
            },
            "compiling-css": {
                src: ["<%= paths.compiling.css %>/**/*"]
            },
            js: {
                src: ["<%= paths.dist.js %>/**/*", "<%= paths.compiling.css %>/**/*"]
            },
            "compiling-js": {
                src: ["<%= paths.compiling.js %>/**/*"]
            },
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
                        src: ["main.scss"],
                        cwd: "<%= paths.src.css %>",
                        dest: "<%= paths.compiling.css %>",
                        ext: ".css"
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: ";"
            },
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.compiling.css %>',
                        src: ['*.css', '!*.min.css'],
                        dest: '<%= paths.compiling.css %>',
                        ext: '.min.css'
                    }
                ]
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            dev: {
                src: ["Gruntfile.js", "<%= paths.src.js %>/**/*.js"],
                options: {
                    "esversion": 6,
                }
            }
        },
        webpack: {
            build: {
                entry: path.resolve(__dirname, '<%= paths.src.js %>/index.js'),
                output: {
                    path: path.resolve(__dirname, '<%= paths.compiling.js %>'),
                    filename: 'build.js'
                },
                stats: {
                    colors: true,
                    modules: true,
                    reasons: true
                },
                storeStatsTo: 'webpackStats',
                progress: true,
                failOnError: true,
                watch: false,
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: "babel-loader",
                            query: {
                                presets: ['es2015']
                            }
                        }
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    "<%= paths.compiling.js %>/main.js": ["<%= paths.compiling.js %>/build.js"]
                }
            }
        },
        watch: {
            gruntfile: {
                files: "Gruntfile.js",
                tasks: ["jshint:dev", "default"],
                options: {
                    debounceDelay: 250,
                },
            },
            scripts: {
                files: "**/*.js",
                tasks: buildJs,
                options: {
                    debounceDelay: 250,
                    cwd: "<%= paths.src.js %>",
                },
            },
            css: {
                files: "**/*.scss",
                tasks: buildCss,
                options: {
                    debounceDelay: 250,
                    cwd: "<%= paths.src.css %>",
                },
            },
        },
    });
    
    grunt.event.on("watch", (action, filepath, target) =>
    {
        grunt.log.writeln(target + ": " + filepath + " has " + action);
    });
    
    grunt.registerTask("default", () =>
    {
        return grunt.task.run(["css", "js"]);
    });
    
    grunt.registerTask("css", () =>
    {
        return grunt.task.run(buildCss);
    });
    
    grunt.registerTask("js", () =>
    {
        return grunt.task.run(buildJs);
    });
    
};