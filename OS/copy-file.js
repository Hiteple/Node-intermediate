const fs = require('fs');

fs.copyFile(__dirname + '/naranja.txt', __dirname + '/naranja-copy-txt', (err => {
    if (err) return console.log(err);
    console.log('File copied!');
}))
