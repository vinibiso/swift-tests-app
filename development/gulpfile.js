var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    webserver = require('gulp-webserver'),
    postcss = require('gulp-postcss'),
    precss = require('precss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost'),
    mqpacker = require('css-mqpacker'),
    nano = require('gulp-cssnano'),
    nunjucksRender = require('gulp-nunjucks-render'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence');

var PATHS = {
    cssSource: 'css/',
    cssDestination: '../production/',
    jsSource: 'js/**/*.js',
    jsOrder:[
      'js/lib/jquery.js',
      'js/lib/router.js',
      'js/lib/handlebars.js',
      'js/lib/fastclick.js',
      'js/tasks/*.js',
      'js/views/**/*.js',
      'js/services/LocalDatabase.js',
      'js/services/API.js',
      'js/app.js',
    ],
    jsDestination: '../production',
    htmlSource: 'templates/**/*.html',
    assetsPath: 'assets/**/*',
    assetsDestination: '../production/assets/',
    serverPath: '../production/',
    deployHtmlSource: '../www/index.html',
    deployDestination: '../www/'
};

function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('styles', function() {
    var processors = [
        precss,
        lost,
        mqpacker,
        autoprefixer
    ];
    return gulp.src(PATHS.cssSource + 'main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors)).on('error', onError)
    .pipe(sourcemaps.write())
    .pipe(nano())
    .pipe(gulp.dest(PATHS.cssDestination));
});

gulp.task('htmls', function() {
    nunjucksRender.nunjucks.configure(['templates/'], {
        watch: false
    });
    // Gets .html and .nunjucks files in pages
    return gulp.src('templates/index.html')
    // Renders template with nunjucks
    .pipe(nunjucksRender()).on('error', onError)
    // output files in app folder
    .pipe(gulp.dest('../production'));
});

gulp.task('scripts', function() {
    return gulp.src(PATHS.jsOrder)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(PATHS.jsDestination));
});

gulp.task('delete-assets', function() {
    return del([PATHS.assetsDestination], {force:true});
});

gulp.task('assets', ['delete-assets'], function() {
    return gulp.src([PATHS.assetsPath])
    .pipe(gulp.dest(PATHS.assetsDestination));
});

gulp.task('watch', function() {
    gulp.watch(PATHS.cssSource + '**/*.css', ['styles']);
    gulp.watch(PATHS.htmlSource, ['htmls']);
    gulp.watch(PATHS.jsSource, ['scripts']);
    gulp.watch(PATHS.assetsPath, ['assets']);
});

gulp.task('copyFilesDeploy', function() {
    return gulp.src([PATHS.serverPath + '**/*'])
    .pipe(gulp.dest(PATHS.deployDestination));
});

gulp.task('build-simple', ['htmls', 'scripts', 'styles', 'assets'], function() {
    runSequence('copyFilesDeploy');
});

gulp.task('build', ['build-simple'], shell.task([
  'cordova run android',
]));


gulp.task('default', ['htmls', 'scripts', 'styles', 'assets','watch'], function() {
    gulp.src(PATHS.serverPath)
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            open: true
        }));
});
