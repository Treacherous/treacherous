var gulp = require('gulp');
var exporter = require("gulp-es6-exporter");
var paths = require("../paths");

gulp.task('generate-exports', function() {
    return gulp.src([paths.source, "!src/index.ts"])
        .pipe(exporter("index.ts", { root: "src" }))
        .pipe(gulp.dest("./src/"));
});