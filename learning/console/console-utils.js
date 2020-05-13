// %s is string
// %d is number
// %j is json
// This uses util.format module

console.log("A %s and a %s", "kitty", "dog");

// Inside node runtime, we can:
//util.format("A %s and a %s", "kitty", "dog");

// In node, it doesn't change like in the client
console.info("Info");
console.warn("Warn");

// -------------------------------
// In node we have assert and trace (for errors)!
// This gives 'assertion failed!'
//console.assert(42 === "42");
// console.trace("hello!");

// Using a custom log debugger --> this runs like 'NODE_DEBUG=foo node console-utils.js'
const util = require('util');
const debuglog = util.debuglog('foo');
debuglog("hello from foo!");
