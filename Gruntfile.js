module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      task: {
        src: ['**/*.html'],
        cwd: 'build',
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
    concat: {
      buildJs: {
        src: ['src/js/**/*.js'],
        dest: 'build/js/main.js'
      },
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
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['src/assets/**'],
            dest: 'build/assets',
            flatten: true,
          },
          {
            expand: true,
            src: ['bower_components/**'],
            dest: 'build',
          },
          {
            expand: true,
            src: ['bower.json'],
            dest: 'build'
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
    jade: {
      compile: {
        options: {
          pretty: true,
          i18n: {
            locales: 'src/locales/*.json',
            namespace: '$in'
          }
        },
        files: {
          'build/index.html': 'src/jade/index.jade',
          'build/videos.html': 'src/jade/videos.jade',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-jade-i18n');

  grunt.registerTask('default', [
    'jshint',
    'concat',
    'sass',
    'copy',
    'jade',
    'wiredep',
    'replace',
  ]);
};
