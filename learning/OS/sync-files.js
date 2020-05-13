const fs = require('fs');

try {
    // process.argv (argument vector) is an array with the process command separated in indexes
    // this runs like this: node OS/sync-files.js OS/naranja.txt
    // where: node is [0], OS/sync-files is [1] and OS/naranja.txt is [2], so we obtain the file name like this
    const file = process.argv[2];
    const content = fs.readFileSync(file).toString();
    const lines = content.split('\n').length;
    console.log(lines);
} catch (err) {
    console.log(err);
}
