module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      task: {
        src: ['build/*.html'],
      }
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
          {
            from: /.*bootstrap-rtl\.css.*/,
            to: ''
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-multi-language');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('default', ['multi_language', 'wiredep', 'replace']);
}