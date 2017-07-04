#!/usr/bin/env phantomjs
/*global phantom: false */
'use strict';

var system = require('system')
  , args   = system.args
  , page   = require('webpage').create()
  ;


var tweetshot = function(url, output, width, height) {
  width   = width  || 1280;
  height  = height || 1024;
  output  = output || 'tweetshot.' + width + 'x' + height + '.png';

  page.viewportSize = { width: width, height: height };
  page.open(url, function(status) {
    if (status !== 'success') {
      console.log('Unable to load url: ' + url);
      phantom.exit();
    }
    window.setTimeout(function() {
      page.clipRect = page.evaluate(function() {
	replies = document.querySelector('[data-component-context="replies"]');
	if (replies) {
    	  replies.parentNode.removeChild(replies);
	}
        var tweet = document.querySelector('[role="main"]');
        return tweet === null? {} : tweet.getBoundingClientRect();
      });
      console.log('Creating file: ' + output);
      page.render(output);
      phantom.exit();
    }, 200);
  });
};

if (args.length === 1) {
  console.log('Usage: ' + args[0] + ' URL [output] [width] [height]');
  phantom.exit();
}

tweetshot(args[1], args[2], args[3], args[4]);

// Local Variables:
// mode: js
// End:
