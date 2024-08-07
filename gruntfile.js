// inicia grunt
module.exports = function(grunt){
    // importacoes 
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    // configuracoes
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                files: {
                    './build/dev/css/less/index.css': './src/less/**/*.less'
                }
            },
            dist: {
                options: {
                    // comprime less
                    compress: true,
                    sourceMap: true
                },
                files: {
                    './build/dist/css/less/index.min.css': './src/less/**/*.less'
                }
            }
        },
        sass: {
            dev: {
                files: {
                    './build/dev/css/sass/configs_sass.css': './src/sass/**/*.scss'
                }
            },
            dist: {
                options: {
                    // minifica
                    style: 'compressed'
                },
                files: {
                    './build/dist/css/sass/configs_sass.min.css': './src/sass/**/*.scss'
                }
            }
        },
        watch: {
            dev: {
                files: ['./src/less/**/*.less', './src/html/**/*.html'],
                tasks: ['concurrent:dev']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    // comprime
                    collapseWhitespace: true,
                    removeComments: true
                },
                files: [{'./prebuild/index.html': './src/html/index.html'}]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: '" href="../../build/dev/css/less/index.css"',
                        replacement: '" href="./css/less/index.min.css"'
                    },
                    {
                       match: '" src="../js/index.js"',
                       replacement: '" src="./js/index.min.js"' 
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['./prebuild/**/*.html'],
                    dest: './build/dist'
                }]
            }
        },
        uglify: {
            target: {
                options: {
                    sourceMap: true
                },
                files: [{'./build/dist/js/index.min.js': './src/js/index.js'}]
            }
        },
        clean: ['./prebuild'],
        concurrent: {
            dev: {
                // 'sass:dev'
                target: ['less:dev']
            },
            dist: {
                // 'sass:dist'
                target: ['less:dist', 'replace:dist', 'uglify']
            }
        }
    });

    // funcoes
    let compilaDist = function(){
        try {
            // tarefas
            grunt.task.run('htmlmin:dist');
            grunt.task.run('concurrent:dist');
            grunt.task.run('clean');
        } catch (error) {
            console.log(error.message);
        }
    }

    // tarefas: padrao
    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('observa', ['watch:dev']);
    // producao
    grunt.registerTask('compila-prod', compilaDist);
};