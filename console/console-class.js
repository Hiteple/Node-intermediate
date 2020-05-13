const fs = require('fs');

const out = fs.createWriteStream(__dirname + '/out.log');
const err = fs.createWriteStream(__dirname + '/err.log');

const consoleFile = new console.Console(out, err);

setInterval(() => {
    consoleFile.log(new Date());
    consoleFile.error(new Error('Oops'));
}, 2000);
