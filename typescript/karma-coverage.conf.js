var shared = require('./karma.conf.js');

module.exports = function(config) {
  shared(config);
  config.set({

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'out/main/**/*.js': ['coverage']
    },

	// https://github.com/karma-runner/karma-coverage
    coverageReporter: {
      dir : 'out/test_results/coverage/',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
	  ]
    },

	browsers: ['PhantomJS']
	
  });

};