var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var paths = require("../paths");

gulp.task('compile', ["clean", "generate-exports"], function() {
    var tsResult = gulp.src([paths.source, paths.typings])
        .pipe(ts({
            declaration: true,
            module: "commonjs",
            target: "es5",
            moduleResolution: "node",
            declarationFiles: true
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.dist + "/definitions")),
        tsResult.js.pipe(gulp.dest(paths.output))
    ]);
});