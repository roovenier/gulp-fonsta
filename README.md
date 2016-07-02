# gulp-fonsta

Use [Fonsta](https://github.com/roovenier/fonsta) within gulp task manager.

[![Build Status](https://travis-ci.org/roovenier/gulp-fonsta.svg?branch=master)](https://travis-ci.org/roovenier/gulp-fonsta) [![npm version](https://badge.fury.io/js/gulp-fonsta.svg)](https://www.npmjs.com/package/gulp-fonsta)

## Install

```sh
$ npm install gulp-fonsta --save-dev
```

## Examples

```javascript
var gulp = require('gulp');
var fonsta = require('gulp-fonsta');

// Pass font list as object and save it into dependencies file (second argument)
gulp.task('fonsta', function() {
	return fonsta({
		nobile: ['medium'],
		roboto: ['regular', 'italic'],
		'pt-sans': ['bold'],
		'open-sans': ['bold']
	}, true)
});

// Pass fonts from a dependency file
gulp.task('fonsta:deps', function() {
	return fonsta(__dirname + '/fonsta.deps.json')
});
```
