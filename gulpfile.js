const gulp = require('gulp');
const connect = require('gulp-connect');
const config = require('./lib/config');
const generate = require('./lib/generate');
const fs = require('fs-extra');
const sass = require('gulp-sass');

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

gulp.task('copyJS', () => {
  return gulp.src(config.static_dir + '/js/**/*')
    .pipe(gulp.dest(config.public_dir + '/js/'))
});

gulp.task('copyImg', () => {
  return gulp.src(config.static_dir + '/img/**/*')
    .pipe(gulp.dest(config.public_dir + '/img/'))
});

gulp.task('generate', () => {
  generate();
});

gulp.task('copyPics', () => {
  return gulp.src(config.pics_dir + '/**/*')
    .pipe(gulp.dest(config.public_dir + '/pics'))
});

gulp.task('copyFile', () => {
  return gulp.src(config.source_dir + '/raw/**/*')
    .pipe(gulp.dest(config.public_dir))
});

gulp.task('default', ['webserver', 'sass', 'assets', 'generate'], () => {

  gulp.watch(config.template_dir + '/**/*.html', ['generate']);

  gulp.watch(config.static_dir + '/sass/**/*.scss', ['sass']);

  gulp.watch(config.static_dir + '/**/*', ['assets'])

});

gulp.task('build', ['sass', 'copyJS', 'copyImg', 'generate', 'copyPics', 'copyFile']);
