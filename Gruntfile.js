'use strict';

module.exports = function(grunt) {
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
  options: {
    // 連結される各ファイル内の間に配置出力する文字列を定義
    separator: ';'
  },
  dist: {
    // 連結するファイル
    src: 'app/scripts/**/*.js',
    // 結果として生成されるJSファイル
    dest: 'build/scripts.js'
  }
},

uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
      },
      dist: {
          // uglifyするファイル
    src: '<%= concat.dist.dest %>',
    // 結果として生成されるJSファイル
    dest: 'build/scripts.min.js'
      }
    },
    
    
    clean: {
            dist: 'build/*'
        },
        
        cssmin: {
        options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
      },
            dist: {
            // concat&minifyするファイル
    src: 'app/styles/**/*.css',
    // 結果として生成されるJSファイル
    dest: 'build/styles.min.css'
            }
        },
        
        
        jshint: {
            options: {
                jshintrc: '.jshintrc'
                //, reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/scripts/**/*.js',
                'test/spec/**/*.js'
            ]
        },
        
        
        copy: {
            dist: {
                files: [{
                expand: true, //なぜか必要
                    cwd: 'app',
                    dest: 'build',
                    src: [
                        'bower_components/*',
                        'styles/main.css'
                    ]
                }]
            }
        },
        
        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['*.html', 'templates/*.html'],
                    dest: 'build'
                }]
            }
        },
        
        
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: 'images/*.{png,jpg,jpeg}',
                    dest: 'build'
                }]
            }
        },
        
        usemin: {
      options: {
        dirs: ['build/']
        },
      html: ['build/*.html']
      },
        
        connect: {
      server: {
        options: {
          port: 9000,  // 適当で可
          hostname: 'localhost',
          base: 'app'
        }   
      },
      
       /* プロキシサーバの設定 */
            proxies: [{
                context: '/jsonApi', //http://localhost:3000/jsonApi/api/1
                host: 'localhost',
                port: '3000',
                https: false,
                changeOrigin: false
            }]
    },   
    
    /* easymockの設定 */
        easymock: {
            jsonApi: {
                options: {
                    port: 3000,
                    path: 'app'
                }
            }
        },
    
    watch: {
        files: 'app/**/*.*',
        livereload: {
            options: {
                livereload: true
            },
            files: [
                'app/**/*.*'
            ]
        }
    },
    
    
    qunit: {
      files: ['test/*.html']
    }
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-easymock');
  grunt.loadNpmTasks('grunt-usemin');
  
  grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'copy', 'htmlmin','imagemin', 'concat', 'uglify', 'cssmin', 'usemin']);
  
  grunt.registerTask('server', ['connect', 'easymock', 'watch']);
};
