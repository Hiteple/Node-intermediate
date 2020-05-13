const fs = require('fs');

fs.readdir(__dirname, ((err, files) => {
    if (err) return console.log(err);
    console.log(files);
}));
