var gulp = require('gulp');
var browser = require('browser-sync').create();
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');


const paths = {
	layout: 'stylus/layout.styl',
	app: 'stylus/application.styl',
	html: ['**/*.html'],
	stylus: ['stylus/**/*.styl'],
	js: ['js/**/*.js'],
	css: ['css/'],
};

function layout(done){

	gulp.src( paths.layout )
		.pipe(plumber())
		.pipe(stylus())
		.pipe(autoprefixer({cascade: false}))
		// .pipe(gulp.dest(paths.css[0]))
		.pipe(cleanCss({keepBreaks: true}))
		.pipe(rename('layout.min.css'))
		.pipe(gulp.dest(paths.css[0]))
		.pipe(browser.stream());

	done();
};

function application(done){

	gulp.src(paths.app)
		.pipe(plumber())
		.pipe(stylus())
		.pipe(autoprefixer({cascade: false}))
		// .pipe(gulp.dest(paths.css[0]))
		.pipe(cleanCss({keepBreaks: true}))
		.pipe(rename('application.min.css'))
		.pipe(gulp.dest(paths.css[0]))
		.pipe(browser.stream());

	done();
};


function deploy(done) {

	browser.init({server: '.', open: false, port: 4000, notify: false});

	gulp.watch(paths.stylus, gulp.parallel(layout, application) );
	gulp.watch(paths.html).on('change', browser.reload);
	gulp.watch(paths.js).on('change', browser.reload);

	done();
};

gulp.task('default', gulp.series(layout, application, deploy));