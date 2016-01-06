var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');
var reporter = require('eslint-html-reporter');
var path = require('path');
var fs = require('fs');
var zip = require('gulp-zip');
var del = require('del');

//pre-test task to hook istanbul to record code coverage
gulp.task('pre-test', function () {
    return gulp.src(['index.js', 'lib/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

//task to run tests
gulp.task('test', ['pre-test', 'lint'], function () {
    return gulp.src(['test/*.js'])
        .pipe(jasmine())
        .pipe(istanbul.writeReports({dir: "build/coverage"}))
        .pipe(istanbul.enforceThresholds({thresholds: {global: 100}}));
});


//task to run es lint.
gulp.task('lint',['clean'], function () {
    return gulp.src(['index.js', 'lib/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format(reporter, function (results) {
            if (!fs.existsSync('build')){
                fs.mkdirSync('build');
            }
            fs.writeFileSync(path.join(__dirname, 'build/lint-report.html'), results);
        }))
        .pipe(eslint.failAfterError());
});

//task to zip files required for lambda deployment
gulp.task('zip',['test'], function () {
    var pjson = require('./package.json');
    var zipFile = pjson.name+'.zip';
    return gulp.src([ 'index.js', 'package.json', 'node_modules/aws-sdk/*', 'lib/*'], {base: "."})
        .pipe(zip(zipFile))
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return del([
        'build/'
    ]);
});


gulp.task('default', ['clean', 'lint', 'test', 'zip'], function () {
    // place code for your default task here
});