module.exports = function(grunt) {

    /**
     * 前後端自動重啟
     *
     * 原文: http://albertchen.top/2015/11/03/Nodejs%E9%85%8D%E7%BD%AE%E8%87%AA%E5%8A%A8%E9%87%8D%E5%90%AF%E4%B8%8E%E9%A1%B5%E9%9D%A2%E5%88%B7%E6%96%B0/
     */
    grunt.initConfig({
        // 前端重啟, 需安裝瀏覽器插件
        // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/related?utm_source=chrome-ntp-icon
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: ['app/views/*']
            }
        },
        // 後端重啟
        nodemon: {
            dev: {
                scripts: './bin/www'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['nodemon', 'watch']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['concurrent']);
};