const gulp = require('gulp'),
  connect = require('gulp-connect'),
  config = require('./lib/config'),
  generate = require('./lib/generate'),
  fs = require('fs-extra'),
  getFiles = require('./index'),
  sass = require('gulp-sass');

gulp.task('webserver', () => {
  connect.server({
    port: 8080,
    root: config.public_dir,
    livereload: true
  });
});

gulp.task('sass', () => {
  return gulp.src(config.static_dir + '/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest(config.public_dir + '/css'))
});

gulp.task('js', () => {
  return gulp.src(config.static_dir + '/js/**/*.js')
    .pipe(gulp.dest(config.public_dir + '/js'))
});

gulp.task('generate', () => {
  console.log('watching template');
  generate();
});

gulp.task('default', ['webserver', 'sass', 'js', 'generate'], () => {

  gulp.watch(config.template_dir + '/**/*.html', ['generate']);

  gulp.watch(config.static_dir + '/sass/*.scss', ['sass']);

  gulp.watch(config.static_dir + '/js/**/*.js', ['js'])

});
