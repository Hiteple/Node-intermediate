const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk
            .toString()
            .toLowerCase()
            .split(' ')
            .map(item => item[0].toUpperCase() + item.slice(1, item.length))
            .join(''));
        callback();
    }
});

process.stdin.pipe(transformStream).pipe(process.stdout);
