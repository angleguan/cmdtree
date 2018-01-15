let gulp = require('gulp');
let htmlmin = require('gulp-htmlmin');
let htmlclean = require('gulp-htmlclean');
let cleanCSS = require('gulp-clean-css');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');

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
      .pipe(gulp.desk('./public'))
  })
  .task('compress', [
    'minify-html', 'clean-css', 'imagemin'
  ])

