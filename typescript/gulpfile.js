/*
	IDEs
		http://typecsdev.com/
		https://atom.io/packages/atom-typescript
*/

var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var amdOptimize = require('gulp-amd-optimizer');
var concat = require('gulp-concat-sourcemap');
var KarmaServer = require('karma').Server;
var del = require('del');
var tslint = require('gulp-tslint');

gulp.task('clean', function () {
    del.sync(['./build/**', './test_results/**', './dist/**']);
});

gulp.task('watch', ['compile'], function(done) {
    connect.server({
        livereload: true
    });
	gulp.watch('sample/**/*.*', ['compile']);
	var watcher = gulp.watch('src/**/*.ts', ['compile']);
	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
    runKarma('./karma-watch.conf.js', done);
});

var requireConfig = {
  baseUrl: "build",
  exclude: [
    'require', 'exports'
  ]
};

gulp.task('compile', function() {
	gulp.src('src/**/*.ts')
/*
		.pipe(tslint())
        .pipe(tslint.report('verbose'), {
          summarizeFailureOutput: true
        })
*/
		.pipe(ts({
			noImplicitAny: true,
			module: 'amd',
			outDir: 'build'
		}))
		.pipe(gulp.dest('build'))
		.pipe(amdOptimize(requireConfig))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('test', function (done) {
    runKarma('./karma.conf.js', done);
});

gulp.task('coverage', function (done) {
    runKarma('./karma-coverage.conf.js', done);
});

var runKarma = function(config, done) {
    KarmaServer.start({
		configFile: require('path').resolve(config)
    }, function() {
        done();
    });
};

gulp.task('default', ['watch']);
