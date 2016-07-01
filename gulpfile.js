var gulp = require('gulp');
var fonsta = require('./index');

gulp.task('fonsta', function() {
	return fonsta({
		nobile: ['medium'],
		roboto: ['regular', 'italic'],
		'pt-sans': ['bold'],
		'open-sans': ['bold']
	}, true)
});

gulp.task('fonsta:deps', function() {
	return fonsta(__dirname + '/fonts');
});

gulp.task('default', ['fonsta']);
