const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

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
  .task('imagemin', () => {
    return gulp.src('./public/**/*.{png,jpg,jpeg}')
      .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest('./public'))
  })
  .task('compress', [
    'minify-html', 'clean-css', 'imagemin'
  ])

