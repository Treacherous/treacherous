var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var paths = require("../paths");

var compileFor = function(moduleType, withTypings) {
    var tsResult = gulp.src([paths.source, paths.typings])
        .pipe(ts({
            declaration: true,
            module: moduleType,
            target: "es5",
            moduleResolution: "node",
            declarationFiles: true
        }));

    if(withTypings) {
        return merge([
            tsResult.dts.pipe(gulp.dest(paths.dist + "/definitions")),
            tsResult.js.pipe(gulp.dest(paths.dist + "/" + moduleType))
        ]);
    }

    return tsResult.js.pipe(gulp.dest(paths.dist + "/" +moduleType));
}

gulp.task('compile', ["clean", "generate-exports"], function() {
    return merge([
        compileFor("umd", true),
        compileFor("system")
    ]);
});