var Promise = require('es6-promise').Promise;
var through = require('through2');
var gutil = require('gulp-util');
var fonsta = require('fonsta/lib/commands/install');

function gulpFonsta(fonts, isSave) {
	isSave = (typeof isSave !== 'boolean') ? false : isSave;

	var stream = through();

	if(typeof fonts !== 'object') {
		try {
			fonts = require(fonts);
		}
		catch(e) {
			stream.emit('error', new gutil.PluginError('gulp-fonsta', e.message));
		}
	}

	var fontsArray = Object.keys(fonts);

	if(fontsArray.length === 0) {
		setTimeout(function() {
			stream.emit('end');
		}, 0);
	}

	fontsArray.reduce(function(prom, font, fontIndex) {
		return prom.then(function() {
			return new Promise(function(resolve, reject) {
				fonsta(font, fonts[font], isSave, false).then(function(result) {
					console.log(result.replace(/\r?\n/, ''));

					if(fontIndex === fontsArray.length - 1) {
						stream.emit('end');
					}

					resolve();
				}, function(err) {
					console.log(err.message.replace(/\r?\n/, ''));

					if(fontIndex === fontsArray.length - 1) {
						stream.emit('end');
					}

					resolve();
				});
			});
		});
	}, Promise.resolve());

	return stream;
}

module.exports = gulpFonsta;
