module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "karma-typescript"],
        files: [
            "src/**/*.ts",
            "test/**/*.ts"
        ],
        preprocessors: {
            "src/**/*.ts": "karma-typescript",
            "test/**/*.ts": "karma-typescript"
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                allowJs: true,
                target: "es2017"
            },
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["PhantomJS"],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    });
};