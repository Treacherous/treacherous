module.exports = function(config) {
    config.set({
        files: [
            'node_modules/bluebird/js/browser/bluebird.js',
            'tests/specs/**/*.ts'
        ],

        preprocessors: {
            'tests/specs/**/*.ts': ['webpack']
        },

        webpack: {
            module: {
                loaders: [
                    { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/}
                ]
            },
            resolve: {
                extensions: ['.ts', '.js', '.tsx', '.jsx', '']
            }
        },

        frameworks: ['mocha'],

        // test result reportergulp
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
        singleRun: true,

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    });
};