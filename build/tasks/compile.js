const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const runSequence = require("run-sequence");
const paths = require("../paths");
const webpack = require("webpack-stream");

const compileFor = function(moduleType, withTypings = false, target = "es2015") {
    console.log(`Compiling for ${moduleType} - targetting ${target}`);
    const tsProject = ts.createProject('tsconfig.json', {
        declaration: withTypings || false,
        module: moduleType,
        target: target
    });
    const tsResult = gulp.src([paths.source])
        .pipe(tsProject());

    if(withTypings) {
        return merge([
            tsResult.dts.pipe(gulp.dest(paths.dist + "/definitions")),
            tsResult.js.pipe(gulp.dest(paths.dist + "/" + moduleType))
        ]);
    }

    return tsResult.js.pipe(gulp.dest(paths.dist + "/" +moduleType));
};

gulp.task("compile-webpack", function() {
    return gulp.src(`${paths.dist}/es2015/index.js`)
        .pipe(webpack({
            output: {
                filename: "treacherous.umd.js",
                library: "Treacherous",
                libraryTarget: "umd"
            }
        }))
        .pipe(gulp.dest(`${paths.dist}/umd`))
});

gulp.task('compile-modules', function(){
   return merge([
       compileFor("commonjs", true, "es5"),
       compileFor("es2015")
   ])
});

gulp.task('compile', ["clean", "generate-exports"], function(callback) {
    return runSequence('compile-modules', 'compile-webpack', callback);
});