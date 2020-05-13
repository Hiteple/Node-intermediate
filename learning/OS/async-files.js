const fs = require('fs');

// process.argv (argument vector) is an array with the process command separated in indexes
// this runs like this: node OS/sync-files.js OS/naranja.txt
// where: node is [0], OS/sync-files is [1] and OS/naranja.txt is [2], so we obtain the file name like this
const file = process.argv[2];

if (!file) {
    throw new Error('You must provide the file path');
}

fs.readFile(file, function(err, content) {
    if (err) return console.log(err);
    const lines = content.toString().split('\n').length;
    console.log(lines);
});
