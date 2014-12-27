module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      task: {
        src: ['index.html'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', []);
}