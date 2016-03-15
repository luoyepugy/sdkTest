
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: { 
                    'dist/css/apps.min.css': 'src/sass/apps.sass'
                }
            }
        },
        uglify: {
            options: {  
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'  
            },  
            build: {   
                src: ['dist/js/common.js','src/js/pages/*.js'],  
                dest: 'dist/js/pages.min.js'   
            }
        },
        coffee: {
            compile: {
                options: {
                    sourceMap: true,
                    sourceMapDir: 'dist/maps/' 
                },
                files: {
                    'dist/js/common.min.js': 'src/coffee/common.coffee'
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3 
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },
        watch: {
	        options: { 
                livereload: true,
                spawn: false    
	        },
            css: {
                files: '**/*.sass',
                tasks: ['sass']
            },
            js: {
                files: 'src/**/*.js',
                tasks: ['uglify']
            },
            coffee: {
                files: ['src/**/*.coffee'],
                tasks: ['coffee']
            }	
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('img', ['imagemin']);    
}

