var paths = require("../paths");
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("minify", ["package:release"], function() {
    return gulp.src(paths.dist + "/validator.js")
        .pipe(uglify())
        .pipe(rename("validator.min.js"))
        .pipe(gulp.dest(paths.dist));
});