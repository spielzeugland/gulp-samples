var gulp = require('gulp');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var amdOptimize = require('gulp-amd-optimizer');
var concat = require('gulp-concat-sourcemap');
var KarmaServer = require('karma').Server;
var del = require('del');

gulp.task('clean', function () {
    del.sync(['./out/**']);
});

gulp.task('watch', ['compile'], function(done) {
    connect.server({
        livereload: true
    });
	var watcher = gulp.watch(['src/**/*.js', 'test/**/*.js', 'sample/**/*.*'], ['compile']);
	watcher.on('change', function(event) {
	  console.log('\n=============================');
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	  console.log('=============================\n');
	});
    runKarma('./karma-watch.conf.js', done);
});

var requireConfig = {
  baseUrl: "src",
  exclude: [
    'require', 'exports'
  ]
};

gulp.task('compile', function() {
	gulp.src('src/**/*.js')
		.pipe(amdOptimize(requireConfig))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('out/dist'))
		.pipe(connect.reload());
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
