var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
require("babel-core/register");
require("babel-polyfill");

gulp.task('default', function(){
  return gulp.src('docs/**/*.js')
    .pipe(babel())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});
