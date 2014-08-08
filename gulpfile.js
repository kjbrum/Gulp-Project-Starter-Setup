// Gulp
var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var htmlv = require('gulp-html-validator');
var notify = require('gulp-notify');

// Define our paths
var paths = {
	scripts: ['js/**/*.js', '!js/app.min.js'],
	sass: 'scss/**/*.scss',
	images: ['img/**/*', '!img/{compressed,compressed/**}']
};

var destPaths = {
	scripts: 'js',
	sass: 'css',
	images: 'img/compressed',
	html: 'validated'
};

// Lint, minify, and concat our JS
gulp.task('js', function() {
	return gulp.src(paths.scripts)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(destPaths.scripts))
		.pipe(notify('app.min.js updated!'));
});

// Compile our Sass
gulp.task('sass', function() {
	return gulp.src(paths.sass)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({sourceComments: 'map', sourceMap: 'sass'}))
		.pipe(rename('app.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(destPaths.sass))
		.pipe(notify('app.css updated!'));
});

// Compress images
gulp.task('images', function() {
	gulp.src(paths.images)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		// .pipe(changed('img/*.*'))
		.pipe(imagemin())
		.pipe(gulp.dest(destPaths.images))
		.pipe(notify('Image(s) optimized!'));
});

// Validate HTML
gulp.task('validate', function() {
	gulp.src('*.html')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		// .pipe(changed(destPaths.html))
		.pipe(htmlv())
		.pipe(gulp.dest(destPaths.html))
		.pipe(notify('HTML validated!'));
});

// Browser Sync - autoreload the browser
// Additional Settings: http://www.browsersync.io/docs/options/
gulp.task('browser-sync', function () {
	var files = [
		'**/*.html',
		'**/*.php',
		'js/app.min.js',
		'css/app.css',
		'img/**/*'
	];
	browserSync.init(files, {
		server: {
			baseDir: './'
		},
		port: 5555
	});
});

// Default Task
gulp.task('default', ['js', 'sass', 'validate', 'browser-sync', 'images'], function() {
	// Watch for changes made to files
	gulp.watch(paths.scripts, ['js']);
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.images, ['images']);
	gulp.watch('*.html', ['validate']);
});
