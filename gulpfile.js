var gulp = require("gulp");

var jshint = require("gulp-jshint");
var sass   = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

//Lint task
gulp.task('lint', function(){
    return gulp.src('public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('clientscripts', function(){
    return gulp.src('public/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/dist'));
});
//Our default task
gulp.task('default', ['lint', 'clientscripts']);