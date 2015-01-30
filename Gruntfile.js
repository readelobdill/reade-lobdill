module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
       srcCSS: {
         src: [
           'src/css/*.scss',
         ],
         dest: 'src/css/style.scss',
       },
       scriptsJS: {
         src: [
           'src/scripts/*.js'
         ],
         dest: 'src/scripts.js',
       },
       libsJS: {
         src: [
           'src/libs/*.js'
         ],
         dest: 'src/libs.js',
       }
     },
     htmlmin: {                                     // Task
       build: {                                      // Target
         options: {                                 // Target options
           removeComments: true,
           collapseWhitespace: true
         },
         files: {                                   // Dictionary of files
           'build/readelobdill.html': 'src/readelobdill.html'
         }
       }
     },
     uglify: {
       buildScripts: {
         src: 'src/scripts/*.js',
         dest: 'build/scripts.js'
       },
       buildLibs: {
         src: 'src/libs/*.js',
         dest: 'build/libs.js'
       }
     },
    sass: {
      build: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/style.css': 'src/css/style.scss'
        }
      },
      src: {
        options: {
          style: 'expanded'
        },
        files: {
          'src/css/style.css': 'src/css/style.scss'
        }
      }
    },
    watch: {
      js: {
        files: ['src/scripts/*.js'],
        tasks: ['concat:libsJS', 'concat:scriptsJS'],
      },
      css: {
        files: ['src/css/*.scss'],
        tasks: ['concat:srcCSS', 'sass:src'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'htmlmin', 'uglify', 'sass']);

};