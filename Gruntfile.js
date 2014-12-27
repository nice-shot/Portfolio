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
          }
        ]
      }
    },
    concat: {
      buildJs: {
        src: ['src/js/**/*.js'],
        dest: 'build/main.js'
      },
      buildCss: {
        src: ['src/css/**/*.css'],
        dest: 'build/main.css'
      }
    },
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-multi-language');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', [
    'jshint',
    'multi_language',
    'wiredep',
    'replace',
    'concat',
  ]);
};
