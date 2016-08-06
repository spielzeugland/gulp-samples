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
var merge = require('merge2');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function () {
    return del.sync(['./out/**']);
});

gulp.task('watch', ['build'], function() {
	connect.server({
        livereload: true
    });
    
    gulp.watch(['src/**/*.*', 'sample/**/*.*'], ['watch-action'])
	    .on('change', function(event) {
	        console.log('\n=============================');
	        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	        console.log('=============================\n');
	});
});

gulp.task('watch-action', ['build'], function (done) {
    connect.reload();
    runKarma('./karma-watch.conf.js', done);
});

var requireConfig = {
  baseUrl: "out/main",
  exclude: [
    'require', 'exports'
  ]
};

gulp.task('compile', function() {
	var tsResult = gulp.src(["src/**/*.ts", 'typings/index.d.ts'])
		.pipe(ts(tsProject));

	var merged = merge([
	    tsResult.js.pipe(gulp.dest('out/main')),
	    tsResult.dts.pipe(gulp.dest('out/definitions'))
    ]);
   
    return merged;
});

gulp.task('optimize', ['compile'], function() {
    return gulp.src(['out/main/*.js', '!out/test/**/*.*'])
        .pipe(amdOptimize(requireConfig))
	    .pipe(concat('all.js'))
	    .pipe(gulp.dest('out/dist'));
});

gulp.task('build', ['clean', 'optimize']);

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
