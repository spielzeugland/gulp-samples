var shared = require('./karma.conf.js');

module.exports = function(config) {
  shared(config);
  config.set({

	reporters: ['progress', 'beep'],
  
	singleRun: false,
	autoWatch: true,
	browsers: ['PhantomJS']

  });

};