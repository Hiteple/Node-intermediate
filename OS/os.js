const os = require('os');

// CPU Info
console.log('CPU Info', os.cpus());

// IP Address
console.log('IP Address', os.networkInterfaces().lo0.map(i => i.address));

// Available RAM
console.log('Available RAM', os.freemem());

// Type of OS
console.log('Type of OS', os.type());

// OS Version
console.log('Version of OS', os.release());

// User info
console.log('User info', os.userInfo());

// Homedir
console.log('Home homedir', os.homedir());
