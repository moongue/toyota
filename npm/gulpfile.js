/**
 * @file
 * Gulp Configuration.
 * @type Module gulp|Module gulp
 */

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  spritesmith = require('gulp.spritesmith'),
  useref = require('gulp-useref'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  sassGlob = require('gulp-sass-glob'),
  g = require("gulp-load-plugins")(),
  stylefmt = require('gulp-stylefmt'),
  eol = require('gulp-eol');


gulp.task('stylefmt', function () {
  return gulp.src('./../css/*.css')
    .pipe(stylefmt())
    .pipe(gulp.dest('./../css/'));
});

gulp.task('eol', ['style-split'], function() {
  return gulp.src('./../css/*.css')
    .pipe(eol())
    .pipe(gulp.dest('./../css/'));
});

gulp.task('style-split', ['scss'], function() {
  return gulp.src("./../css/basic/style.css")
    .pipe(g.extractMediaQueries())
    .pipe(gulp.dest("./../css"));
});

// Sprite.
gulp.task('sprite', function generateSpritesheets() {
  // For avoid cashing with a static files.
  // Get current date on new sprite generate and add on a sprite.
  var timestamp = Date.now();
  var spriteData = gulp.src('./../images/sprite/*.png')
    .pipe(spritesmith({
      retinaSrcFilter: './../images/sprite/*-2x.png',
      padding: 5,
      imgName: 'sprite.png',
      imgPath: '/sites/default/themes/custom/chantix/images/sprite.png?' + timestamp,
      retinaImgName: 'sprite-2x.png',
      retinaImgPath: '/sites/default/themes/custom/chantix/images/sprite-2x.png?' + timestamp,
      cssName: '_sprite.scss'
    }));
  spriteData.img.pipe(gulp.dest('./../images/'));
  spriteData.css.pipe(gulp.dest('./../scss/'));
  return spriteData;
});

// Compress images.
gulp.task('images', ['sprite'], function (cb) {
  gulp.src(['./../images/*.png', './../images/*.jpg', './../images/*.gif', './../images/*.jpeg']).pipe(imagemin({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  })).pipe(gulp.dest('./../images')).on('end', cb).on('error', cb);
});

// Gulp scss.
gulp.task('scss', function () {
  var stream = gulp.src('./../scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(stylefmt())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./../css'));
  return stream;
});

// Compile.
gulp.task('compile', function () {
  gulp.src('./../scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./../css/'))
});

// Watch (should be used by default).
gulp.task('watch', function () {
  gulp.watch('./../images/sprite/*.png', ['sprite']);
  gulp.watch(['./../images/*.png', './../images/*.jpg', './../images/*.gif', './../images/*.jpeg'], ['images']);
  gulp.watch('./../scss/**/*.scss', ['eol']);
//  gulp.watch('./../css/basic/style.css', ['style-split']);
//  gulp.watch('./../css/**/*.css', ['eol']);
});

// Clean.
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('build', ['images', 'eol']);
