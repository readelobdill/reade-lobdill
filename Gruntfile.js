module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
       build: {
         src: [
           'src/css/*.scss',
         ],
         dest: 'build/css/build.css',
       },
       srcCSS: {
         src: [
           'src/css/*.scss',
         ],
         dest: 'src/css/build.css',
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
     handlebars: {
       compile: {
        options: {
          namespace: "Handlebars.templates",
          processName: function(filePath) {
              return filePath.replace(/^src\/templates\//, '').replace(/\.hbs$/, '');
          }
        },
         files: {
           "src/templates/compiled-templates.js": ["src/templates/*.hbs"],
           "build/templates/compiled-templates.js": ["src/templates/*.hbs"]
         }
       }
     },
    sass: {
      build: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/style.css': 'build/css/build.css'
        }
      },
      src: {
        options: {
          style: 'expanded'
        },
        files: {
          'src/css/style.css': 'src/css/build.css'
        }
      }
    },
    watch: {
      js: {
        files: ['src/scripts/*.js'],
        tasks: ['concat'],
      },
      css: {
        files: ['src/css/*.scss'],
        tasks: ['concat', 'sass'],
      },
      html: {
        files: ['src/runningbyrd.html'],
        tasks: ['htmlmin'],
      },
      templates: {
        files: ['templates/*.hbs'],
        tasks: ['handlebars'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'htmlmin', 'uglify', 'sass', 'handlebars']);

};