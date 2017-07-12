// Chestnut Gruntfile
module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
     
        
        watch: {
            // If any .less file changes in directory "../assets/less/AdminLTE/" run the "less"-task.
            files: ["../assets/less/bootswatch/global/bootswatch_custom.less","../assets/less/bootswatch/<%=frontTheme%>/bootswatch.less", "../assets/js/index.js","../views/front/home/index.html"],
            tasks: ["cssBuild","jsBuild"],
            options: {
                livereload: true,
                nospawn: true
              }
        },
        connect: {
        	base: {
              options: {
                port: 80,
                hostname:'*',
                livereload: true,
                open: true
              }
            },
            server: {
              options: {
            	protocol: 'http',
                port: 80,
                livereload: true,
                keepalive: true,
                open: true,
                base:{path:'./'}
              }
            }
        },
/*        concat: {
            options: {
              stripBanners: false
            },
            concatAssetsJs: {
          	  src: ['../assets/js/bootstrap.js','../assets/js/bootswatch.js'],
              dest: '../assets/js/base.js'
              }
          },*/
        // "less"-task configuration
        // This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
        less: {
            // Development not compressed
            toBuildCss: {
                options: {
                    // Whether to compress or not
                    compress: false
                },
                files: [{
                	"../build/css/bootswatch.css":"../assets/less/bootswatch/<%=frontTheme%>/bootswatch_custom.less"
                	},
                	{
                
                              // compilation.css  :  source.less
                              "../build/css/AdminLTE.css": "../assets/less/AdminLTE/AdminLTE.less",
                              //Non minified skin files
                              "../build/css/skins/skin-blue.css": "../assets/less/AdminLTE/skins/skin-blue.less",
                              "../build/css/skins/skin-black.css": "../assets/less/AdminLTE/skins/skin-black.less",
                              "../build/css/skins/skin-yellow.css": "../assets/less/AdminLTE/skins/skin-yellow.less",
                              "../build/css/skins/skin-green.css": "../assets/less/AdminLTE/skins/skin-green.less",
                              "../build/css/skins/skin-red.css": "../assets/less/AdminLTE/skins/skin-red.less",
                              "../build/css/skins/skin-purple.css": "../assets/less/AdminLTE/skins/skin-purple.less",
                              "../build/css/skins/skin-blue-light.css": "../assets/less/AdminLTE/skins/skin-blue-light.less",
                              "../build/css/skins/skin-black-light.css": "../assets/less/AdminLTE/skins/skin-black-light.less",
                              "../build/css/skins/skin-yellow-light.css": "../assets/less/AdminLTE/skins/skin-yellow-light.less",
                              "../build/css/skins/skin-green-light.css": "../assets/less/AdminLTE/skins/skin-green-light.less",
                              "../build/css/skins/skin-red-light.css": "../assets/less/AdminLTE/skins/skin-red-light.less",
                              "../build/css/skins/skin-purple-light.css": "../assets/less/AdminLTE/skins/skin-purple-light.less",
                              "../build/css/skins/_all-skins.css": "../assets/less/AdminLTE/skins/_all-skins.less",

                     },
                    {
                    expand: true, 
                    cwd: '../assets/less',//less
                    src: ['*.less', '**/*.less', '!AdminLTE/*.less', '!AdminLTE/**/*.less','!bootswatch/*.less', '!bootswatch/**/*.less'],
                    dest: '../build/css',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            minBuildCss: {
                options: {
                    // Whether to compress or not
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '../build/css',//css
                    src: ['*.css', '**/*.css', '!*.min.css', '!**/*.min.css'],
                    dest: '../build/css',//
                    ext: '.min.css',
                    extDot: 'last'
                }]
            }
        },
        autoprefixer: {
            options: {
              browsers:'<%=configBridge.config.autoprefixerBrowsers %>'
            },
            dist: {
            	files:[{
                    expand: true,
                    cwd: '../build/css',
                    src: ['*.css', '**/*.css'],
                    dest: '../build/css',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
          },
        // Uglify task info. Compress the js files.
        uglify: {
            options: {
                mangle: true,
                preserveComments: 'some'
            },
            minBuildJs: {
                files: [{
                    //'../build/js/app.min.js': ['../assets/js/app.js'],
                    //'../build/js/demo.min.js': ['../assets/js/demo.js'],
                    //'../build/js/pages/*.min.js': ['../assets/js/pages/*.js']
                    expand: true,
                    cwd: '../build/js',
                    src: ['*.js', '**/*.js', '!*.min.js', '!**/*.min.js'],//����js�ļ�
                    dest: '../build/js',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
        },
        // Copy the js min files.
        copy: {
        	moveLess:{
                files: {'../assets/less/bootswatch/<%=frontTheme%>/bootswatch_custom.less':'../assets/less/bootswatch/global/bootswatch_custom.less'}
            },
            toBuildCss:{
                files: [{
                    expand: true,
                    cwd: '../assets/css',
                    src: ['*'],
                    dest: '../build/css'
                }]
            },
            toBuildJs: {
                files: [{
                    expand: true,
                    cwd: '../assets/js',
                    src: ['*.js', '**/*.js'],
                    dest: '../build/js'
                }]
            },
            toBuildPlugins: {
                files: [{
                    expand: true,
                    cwd: '../assets/plugins',
                    src: ['*.*','**/*.*'],
                    dest: '../build/plugins'
                }]
            },
            toBuildFonts: {
                files: [{
                    expand: true,
                    cwd: '../assets/fonts',
                    src: ['*.*', '**/*.*'],
                    dest: '../build/fonts'
                }]
            },
            toBuildImages: {
                files: [{
                    expand: true,
                    cwd: '../assets/images',
                    src: ['*.*', '**/*.*'],
                    dest: '../build/images'
                }]
            }
        },
        // Build the documentation files
        includes: {
            build: {
                src: ['*.html'], // Source files
                dest: 'documentation/', // Destination directory
                flatten: true,
                cwd: 'documentation/build',
                options: {
                    silent: true,
                    includePath: 'documentation/build/include'
                }
            }
        },

        // Optimize images
        image: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'build/img/',
                    src: ['**/*.{png,jpg,gif,svg,jpeg}'],
                    dest: 'dist/img/'
                }]
            }
        },

        // Validate JS code
        jshint: {
            options: {
                jshintrc: '../assets/js/.jshintrc'
            },
            core: {
                src: '../assets/js/app.js',
            },
            demo: {
                src: '../assets/js/demo.js'
            }
            //pages: {
            //    src: '../assets/js/pages/*.js'
            //}
        },

        // Validate CSS files
        csslint: {
            options: {
               // csslintrc: '../assets/less/AdminLTE/.csslintrc'
            },
            dist: [
              //'../build/css/AdminLTE.min.css',
            ]
        },

        // Validate Bootstrap HTML
        bootlint: {
            options: {
                relaxerror: ['W005']
            },
            files: ['../assest/less/bootstrap/pages/**/*.html', '../assest/less/bootstrap/pages/*.html']
        },

        // Delete images in build directory
        // After compressing the images in the build/img dir, there is no need
        // for them
        clean: {
            options: { force: true },
            css: ["../build/css/*"],
            js: ["../build/js/*"],
            plugins: ["../build/plugins/*"],
            fonts: ["../build/fonts/*"],
            images: ["../build/images/*"],
            noMinCss: ["../build/css/*.css", "../build/css/**/*.css", "!../build/css/*.min.css", "!../build/css/**/*.min.css"],
            noMinJs: ["../build/js/*.js", "../build/js/**/*.js", "!../build/js/*.min.js", "!../build/js/**/*.min.js"]
        }
    });
    
    
    
    

    // Load all grunt tasks
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    // LESS Compiler
    grunt.loadNpmTasks('grunt-contrib-less');
    // Watch File Changes
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Compress JS Files
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Include Files Within HTML
    grunt.loadNpmTasks('grunt-includes');
    // Optimize images
    grunt.loadNpmTasks('grunt-image');
    // Validate JS code
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // Delete not needed files
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Lint CSS
    grunt.loadNpmTasks('grunt-contrib-csslint');
    // Lint Bootstrap
    grunt.loadNpmTasks('grunt-bootlint');

    // Copy File or Folder
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Clean File or Folder
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Linting task
    grunt.registerTask('lint', ['jshint', 'csslint', 'bootlint']);

    // css task
    grunt.registerTask('cssBuild', ["clean:css","copy:moveLess","less:toBuildCss", "copy:toBuildCss","autoprefixer","less:minBuildCss", "clean:noMinCss"]);

    // js task
    grunt.registerTask('jsBuild', ["clean:js","copy:toBuildJs", "uglify:minBuildJs", "clean:noMinJs"]);

    // plugins task
    grunt.registerTask('pluginsBuild', ["clean:plugins", "copy:toBuildPlugins"]);

    // fonts task
    grunt.registerTask('fontsBuild', ["clean:fonts", "copy:toBuildFonts"]);
    
    // fonts task
    grunt.registerTask('imagesBuild', ["clean:images", "copy:toBuildImages"]);

    //main task
    grunt.registerTask('build', ["cssBuild", "jsBuild", "pluginsBuild", "fontsBuild","imagesBuild"]);
    
    grunt.registerTask('alive',['connect:server','watch']);
    // The default task (running "grunt" in console) is "build"
    grunt.registerTask('default', ['build']);
};
