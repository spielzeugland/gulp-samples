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
    del.sync(['./out/**']);
});

gulp.task('watch', ['compile'], function(done) {
    connect.server({
        livereload: true
    });
	var watcher = gulp.watch(['src/**/*.ts', 'test/**/*.ts', 'sample/**/*.*'], ['compile']);
	watcher.on('change', function(event) {
	  console.log('\n=============================');
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	  console.log('=============================\n');
	});
    runKarma('./karma-watch.conf.js', done);
});

var requireConfig = {
  baseUrl: "out/main",
  exclude: [
    'require', 'exports'
  ]
};

gulp.task('compile', function() {
	var tsResult = gulp.src('src/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			module: 'amd',
			outDir: 'out/main',
			declaration: true
		}));
	
	tsResult.js.pipe(gulp.dest('out/main'))
		.pipe(amdOptimize(requireConfig))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('out/dist'))
		.pipe(connect.reload());
	
	tsResult.dts.pipe(gulp.dest('out/definitions'));
	
	gulp.src(['test/**/*.ts', 'out/definitions/**/*.d.ts'])
		.pipe(ts({
			noImplicitAny: true,
			module: 'amd',
			outDir: 'out/test'
		}))
		.pipe(gulp.dest('out/test'));
});

gulp.task('test', function (done) {
    runKarma('./karma.conf.js', done);
});

gulp.task('debug-test', function (done) {
    runKarma('./karma-debug.conf.js', done);
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
