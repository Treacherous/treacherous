module.exports = function(config) {
    config.set({

        basePath: '..',

        // frameworks to use
        frameworks: ['mocha', 'chai-as-promised', 'chai-spies', 'chai'],

        files: [
            'dist/treacherous.all.js',
            'tests/specs/**/*.js',
            'node_modules/property-resolver/**/property-resolver.js'
        ],

        // test result reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        browsers: ['Firefox'],

        // Continuous Integration mode
        singleRun: false
    });
};