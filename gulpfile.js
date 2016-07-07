var gulp = require('gulp');
var fonsta = require('./index');

gulp.task('fonsta', function() {
	return fonsta(
		{
			nobile: ['medium'],
			roboto: ['regular', 'italic'],
			'pt-sans': ['bold'],
			'open-sans': ['bold']
		},
		{
			saveDeps: true
		}
	);
});

gulp.task('fonsta:deps', function() {
	return fonsta(__dirname + '/fonts');
});

gulp.task('fonsta:options', function() {
	return fonsta(
		__dirname + '/fonts',
		{
			saveDeps: false,
			noCss: true,
			tmpDir: '/temp/fonts',
			fontsDir: '/vendor/fonts',
			cssDir: '/vendor/css',
			cssFile: 'vendor.css'
		}
	);
});

gulp.task('default', ['fonsta']);
