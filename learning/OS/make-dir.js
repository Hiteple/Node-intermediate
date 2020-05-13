const fs = require('fs');

fs.mkdir(__dirname + '/test', { recursive: true }, (err) => {
    if (err) return console.log(err);
});
