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
    dest: 'build/<%= pkg.name %>.js'
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
    dest: 'build/<%= pkg.name %>.min.js'
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
    dest: 'build/<%= pkg.name %>.min.css'
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
                context: '/json_api', //http://localhost:3000/json_api/api/1
                host: 'localhost',
                port: '3000',
                https: false,
                changeOrigin: false
            }]
    },   
    
    /* easymockの設定 */
        easymock: {
            json_api: {
                options: {
                    port: 3000,
                    path: 'app',
                },
            },
        },
    
    watch: {
        files: 'app/**/*.*',
      options: {
        livereload: true // 変更があればリロード
      }
    },
    
    
    qunit: {
      files: ['test/*.html']
    },
    
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
  
  grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'copy', 'htmlmin','imagemin',  'concat', 'uglify', 'cssmin']);
  
  grunt.registerTask('server', ['connect', 'easymock', 'watch']);
};
