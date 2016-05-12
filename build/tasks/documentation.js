var paths = require('../paths');
var gulp = require("gulp");
var typedoc = require("gulp-typedoc");

gulp.task("generate:documentation", function() {
    return gulp
        .src([
            paths.source, paths.typings,
            "!src/exposer.ts",
            "!src/index.ts"
        ])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            out: paths.docs + "/technical",
            name: "Treacherous"
        }));
});