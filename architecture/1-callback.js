const asyncCallback = (cb) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            return cb( 'Hello world!');
        } else {
            return cb(new Error('Hello Error!'));
        }
    }, 2000);
}

asyncCallback((err, msg) => {
    if (err) console.log(err)
    else console.log(msg);
});
