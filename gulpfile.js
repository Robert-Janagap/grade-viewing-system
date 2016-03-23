var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

gulp.task('jade', function(){

	return gulp.src('./src/**/*.jade')
		.pipe(jade({
			pretty: true
			}))
		.pipe(gulp.dest('build/'));
	});

gulp.task('sass', function(){

	return gulp.src('./src/style/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
			}))
		.pipe(gulp.dest('build/style'));
	});

gulp.task('watching', function(){

	gulp.watch('src/**/*.jade', ['jade']);
	gulp.watch('src/**/*.scss', ['sass']);

	})

gulp.task('default', ['watching']);