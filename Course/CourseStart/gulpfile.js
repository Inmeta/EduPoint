var gulp = require('gulp');
var webpack = require('webpack-stream');
var gulpSequence = require('gulp-sequence');
var watch = require('gulp-watch');
var paths = {   
    sp_ptassets_dev:"Q:\\", 
    dev:"Q:\\Apps\\Dashboard", 
  
}

gulp.task('webpack', function() {
  return gulp.src('./app.tsx')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./'));
});

gulp.task("distribute", function() {
    gulp.src("./bundle.js.map")
    .pipe(gulp.dest(paths.dev));
    gulp.src("./bundle.js")
    .pipe(gulp.dest(paths.dev));
     gulp.src("./coursestart.aspx")
    .pipe(gulp.dest(paths.sp_ptassets_dev));
});

gulp.task('default', function () {
   gulp.watch(['*.ts','*.html'] , ['push']);
});

gulp.task('push', function(callback) {
  gulpSequence(['webpack'],['distribute'])(callback)
});
