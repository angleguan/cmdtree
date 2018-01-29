let gulp = require('gulp'),
  connect = require('gulp-connect'),
  config = require('./lib/config'),
  generate = require('./lib/generate'),
  fs = require('fs-extra'),
  getFiles = require('./index');

gulp.task('webserver', function () {
  connect.server({
    port: 8080,
    root: config.public_dir,
    livereload: true
  });
});

gulp.task('default', ['webserver'], function () {

  fs.watch('./template', {}, function (event, filename) {
    console.log('watch task');
    generate();
  })

});