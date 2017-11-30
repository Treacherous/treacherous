var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var paths = require("../paths");

var compileFor = function(moduleType, withTypings = false, target = "es2015") {
    console.log(`Compiling for ${moduleType} - targetting ${target}`);
    var tsProject = ts.createProject('tsconfig.json', {
        declaration: withTypings || false,
        module: moduleType,
        target: target
    });
    var tsResult = gulp.src([paths.source])
        .pipe(tsProject());

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
        compileFor("commonjs", true, "es5"),
        compileFor("es2015")
    ]);
});