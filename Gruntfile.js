module.exports = function(grunt) {
    //config project
    grunt.initConfig({
        watch: {
            files: ['**/*'],
            options: {
                livereload: true,
            },
            express: {
                files:  [ 'bin/www' ],
                options: {
                    spawn: false
                }
            }
        },
        //start express server and run server.js
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'bin/www'
                }
            }
        }
    });
    //enable plugins
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //register task
    grunt.registerTask('default', ['express','watch']);
};