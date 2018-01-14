let gulp = require('gulp');
let htmlmin = require('gulp-htmlmin');
let htmlclean = require('gulp-htmlclean');
let cleanCSS = require('gulp-clean-css');

gulp.task('clean-css', () => {
    return gulp.src('./public/**/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('./public'));
  })
  .task('minify-html', () => {
    return gulp.src('./public/**/*.html')
      .pipe(htmlclean())
      .pipe(htmlmin({
        removeAttributeQuotes: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true
      }))
      .pipe(gulp.dest('./public'))
  })
  .task('compress', [
    'minify-html', 'clean-css'
  ])
  
