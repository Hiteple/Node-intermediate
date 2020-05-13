const asyncExample = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve( 'Hello world!');
        } else {
            reject(new Error('Hello Error!'));
        }
    }, 2000);
})

async function asyncAwait() {
    try {
    const msg = await asyncExample();
    console.log(msg);
    } catch (err) {
        console.log('Oops ' + err);
    }
}

asyncAwait().then(() => console.log('asyncAwait returned!'));

