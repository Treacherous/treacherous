var paths = require('../paths');
var gulp = require("gulp");
var webpack = require("webpack-stream");

gulp.task('package:release', ["compile"], function () {
    var webpackConfig = {
        output: {
            entry: "index.js",
            filename: "treacherous.js",
            library: "Treacherous",
            libraryTarget: "umd"
        },
        externals: [
            {
                "bluebird": true
            }
        ]
    };

    return gulp.src([paths.output + "/index.js"])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('package:all', ["compile"], function () {
    var webpackConfig = {
        output: {
            entry: "index.js",
            filename: "treacherous.all.js",
            library: "Treacherous",
            libraryTarget: "umd"
        }
    };

    return gulp.src([paths.output + "/index.js"])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('package:minimal', ["compile"], function () {
    var webpackConfig = {
        output: {
            entry: "index.js",
            filename: "treacherous.minimal.js",
            library: "Treacherous",
            libraryTarget: "umd"
        },
        externals: [
            {
                "bluebird": true,
                "eventjs": true,
                "property-resolver": true
            }
        ]
    };

    return gulp.src([paths.output + "/index.js"])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('package', ["package:release", "package:all", "package:minimal"]);