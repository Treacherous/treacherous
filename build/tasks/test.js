var gulp = require("gulp");
var Server = require('karma').Server;
var path = require("path");

gulp.task('run-tests', function (done) {
    new Server({
        configFile: path.resolve(__dirname, "../../tests/karma.conf.js"),
        singleRun: true
    }, done).start();
});