module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      task: {
        src: ['build/**/*.html'],
      }
    },
    watch: {
      files: [
        'Gruntfile.js',
        'src/**',
      ],
      tasks: ['default'],
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
    },
    multi_language: {
      translate: {
        resources: 'src/lang/',
        options: {
          tag: '{{ }}',
          src: 'src/html/index.html',
          dest: 'build'
        }
      }
    },
    replace: {
      task: {
        src: ['build/en/*.html'],
        overwrite: true,
        replacements: [
          // Remove bootstrap-rtl from english html files
          {
            from: /.*bootstrap-rtl\.css.*/,
            to: ''
          },
        ]
      },
      mark_he: {
        src: ['build/*.he.html'],
        overwrite: true,
        replacements: [
          {
            from: '<html lang="en">',
            to: '<html lang="he">',
          },
        ]
      }
    },
    concat: {
      buildJs: {
        src: ['src/js/**/*.js'],
        dest: 'build/js/main.js'
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['src/assets/*'],
            dest: 'build/assets',
            flatten: true,
          },
        ]
      },
      heHtml: {
        files: [
          {
            cwd: 'build',
            src: ['**/*.he.html'],
            dest: 'build/he/',
            expand: true,
            rename: function(dest, src) {
              return dest + src.replace('.he', '');
            }
          }
        ]
      },
      enHtml: {
        files: [
          {
            cwd: 'build',
            src: ['**/*.en.html'],
            dest: 'build/en/',
            expand: true,
            rename: function(dest, src) {
              return dest + src.replace('.en', '');
            }
          }
        ]
      }
    },
    sass: {
      buildCss: {
        files: {
          'build/css/main.css': 'src/css/main.scss',
        }
      }
    },
    clean: {
      buildLangHtml: {
        src: ['build/*.he.html', 'build/*.en.html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-multi-language');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', [
    'jshint',
    'multi_language',
    'concat',
    'sass',
    'copy',
    'clean',
    'wiredep',
    'replace',
  ]);
};
