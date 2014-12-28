module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      task: {
        src: ['build/*.html'],
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
        src: ['build/*.en.html'],
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
      buildCss: {
        src: ['src/css/**/*.css'],
        dest: 'build/css/main.css'
      }
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

  grunt.registerTask('default', [
    'jshint',
    'multi_language',
    'wiredep',
    'replace',
    'concat',
    'copy',
  ]);
};
