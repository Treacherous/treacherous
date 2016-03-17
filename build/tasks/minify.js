var paths = require("../paths");
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("minify", ["package"], function() {
    return gulp.src(paths.dist + "/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});