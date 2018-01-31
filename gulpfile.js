const gulp = require('gulp'),
  connect = require('gulp-connect'),
  config = require('./lib/config'),
  generate = require('./lib/generate'),
  fs = require('fs-extra'),
  getFiles = require('./index'),
  sass = require('gulp-sass');

gulp.task('webserver', function () {
  connect.server({
    port: 8080,
    root: config.public_dir,
    livereload: true
  });
});

gulp.task('sass', function(){
  return gulp.src(config.static_dir + '/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest(config.public_dir + '/css'))
});

gulp.task('default', ['webserver'], function () {

  fs.watch(config.template_dir, {}, () => {
    console.log('watching template');
    generate();
  });

  gulp.watch(config.static_dir + '/sass/*.scss', ['sass']);

});
