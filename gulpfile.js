var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  prefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  jade = require('gulp-jade'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  ghPages = require('gulp-gh-pages');

// Paths
var src = './src/',
  jadesrc = src + 'jade/',
  imgsrc = src + 'img/',
  stylsrc = src + 'stylus/',
  jssrc = src + 'js/',
  site = './site/',
  stuff = site + 'stuff/',
  imgdest = stuff + 'img';
  heroku = '../cbhsq_proto';

// error handling
function customPlumber() {
  return plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  });
}

// Jade to HTML
gulp.task('jade', function( ){
  gulp.src(jadesrc + '*.jade')
  .pipe(customPlumber())
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest(site))
  .pipe(browserSync.reload({
    stream: true
  }))
})

// Compile Stylus
gulp.task('styles', function(){
  return gulp.src(stylsrc + 'styles.styl')
  .pipe(customPlumber())
  .pipe(stylus())
  .pipe(gulp.dest(stuff))
  .pipe(browserSync.reload({
    stream: true
  }))
})

// Compress JS
gulp.task('scripts', function(){
  gulp.src(jssrc + '*.js')
  .pipe(customPlumber())
  .pipe(uglify())
  .pipe(gulp.dest(stuff))
})

gulp.task('images', function(){
  gulp.src(imgsrc)
  .pipe(customPlumber())
  .pipe(cache(imagemin({
    interlace: true
  })))
  .pipe(gulp.dest(imgdest))
})

// Watch tasks
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: site
    }
  })
})

gulp.task('watch', ['browserSync'], function(){
  gulp.watch(jadesrc + '**/*.jade', ['jade']);
  gulp.watch(stylsrc + '**/*.styl', ['styles']);
  gulp.watch(jssrc + '**/*.js', ['scripts']);
})

gulp.task('default', ['jade', 'styles', 'scripts', 'watch'])

// Deploy
gulp.task('copysite', function(){
  gulp.src(site + '/*')
  .pipe(gulp.dest(heroku))
})

gulp.task('copystuff', function(){
  gulp.src(site + '/stuff/*')
  .pipe(gulp.dest(heroku + '/stuff'))
})

gulp.task('copyimg', function(){
  gulp.src(site + '/stuff/img/*')
  .pipe(gulp.dest(heroku + '/stuff/img/'))
})

// don't need to deploy to cbhsq proto anymore -- now straight to gh-pages and heruko will pick up from there
//gulp.task('deploy', ['copysite', 'copystuff', 'copyimg'])

// Deploy to GH-Pages
gulp.task('deploy', function() {
  return gulp.src(site + '**/*')
    .pipe(ghPages());
});
