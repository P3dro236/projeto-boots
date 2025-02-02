module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    htmlmin:{
      production:{
        options:{
          removeComments: true,
          collapseWhitespace: true,
        },
        files:{
          "./preBuild/index.html": "./src/index.html"
        }
      }
      
    },
    sass: {
      development:{
        options: {
          style: 'expanded'
        },
        files: {
          './dev/styles/main.css': './src/styles/main.scss'
        }
      },
      production:{
        options: {
          style: 'compressed'
        },
        files: {
          './dist/styles/main.min.css': './src/styles/main.scss'
        }
      },
    },
    watch: {
      scss: {
        files: "./src/styles/*.scss",
        tasks: ["sass:development"]
      },
      uglify:{
        files: "./src/scripts/main.js",
        tasks: ["uglify:development"]
      },
      replace:{
        files: "./src/index.html",
        tasks: ["replace:development"]
      }
    },
    replace:{
      development:{
        options:{
          patterns:[
            {
              match: "css-file",
              replacement: "./styles/main.css"
            },
            {
              match: "js-file",
              replacement: "./scripts/main.js"
            }
          ]
        },
        files:[{
          expand: true,
          flatten: true,
          src: "./src/index.html",
          dest: "./dev"
        }]
      },
      production:{
        options:{
          patterns:[
            {
              match: "css-file",
              replacement: "./styles/main.min.css"
            },
            {
              match: "js-file",
              replacement: "./scripts/main.min.js"
            }
          ]
        },
        files:[{
          expand: true,
          flatten: true,
          src: "./preBuild/index.html",
          dest: "./dist"
        }]
      }
    },
    uglify:{
      development:{
        options:{
          mangle: false,
          compress: false,
          beautify: true
        },
        files:{
          "./dev/scripts/main.js": "./src/scripts/main.js"
        }
      },
      production:{
        options:{
          mangle: true,
          compress: true
        },
        files:{
          "./dist/scripts/main.min.js": "./src/scripts/main.js"
        }
      }
    },
    clean:["prebuild"]
  })
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-contrib-sass")
  grunt.loadNpmTasks("grunt-contrib-htmlmin")
  grunt.loadNpmTasks("grunt-replace")
  grunt.loadNpmTasks("grunt-contrib-clean")
  grunt.loadNpmTasks("grunt-contrib-uglify")

  grunt.registerTask("default", ["sass", "uglify", "replace", "watch"])
  grunt.registerTask("build", ["sass:production", "htmlmin:production", "uglify:production", "replace:production", "clean"])
  
}