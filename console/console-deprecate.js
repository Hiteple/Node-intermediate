const util = require('util');

// Deprecation!
(util.deprecate(() => {
   console.log('Hello Pluto...');
}, 'Pluto is deprecated. It is not a planet anymore...'))();
