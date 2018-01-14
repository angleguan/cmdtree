const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');

gulp.task('minify-css', () => {
    return gulp.src('./public/**/*.css')
      .pipe(minifycss())
      .pipe(gulp.dest('./public'));
  })
  .task('minify-html', () => {
    return gulp.src('./public/**/*.html')
      .pipe(htmlclean())
      .pipe(htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }))
      .pipe(gulp.dest('./public'))
  })
  .task('compress', [
    'minify-html', 'minify-css'
  ])
  
