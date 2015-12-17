var shared = require('./karma.conf.js');

module.exports = function(config) {
  shared(config);
  config.set({

	reporters: ['progress'],
  
	singleRun: false,
	autoWatch: true,
	browsers: ['PhantomJS']

  });

};