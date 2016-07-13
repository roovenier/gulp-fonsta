var Promise = require('es6-promise').Promise;
var through = require('through2');
var gutil = require('gulp-util');
var fonsta = require('fonsta/lib/commands/install');

function gulpFonsta(fonts, options) {
	options = options || {};

	var flags = {
		isSave: (typeof options.saveDeps !== 'boolean') ? false : options.saveDeps,
		noCss: (typeof options.noCss !== 'boolean') ? false : options.noCss
	};

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
				fonsta(font, fonts[font], flags, false, options).then(function(result) {
					result = result.replace(/\r?\n/, '').split(/\r\n|\n|\r/);

					for(var i=0; i<result.length; i++) {
						gutil.log('gulp-fonsta:', result[i]);
					}

					if(fontIndex === fontsArray.length - 1) {
						stream.emit('end');
					}

					resolve();
				}, function(err) {
					gutil.log('gulp-fonsta:', err.message.replace(/\r?\n/, ''));

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
