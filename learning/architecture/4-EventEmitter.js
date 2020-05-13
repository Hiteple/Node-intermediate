const EventEmitter = require('events');

class Logger extends EventEmitter {
    execute(cb) {
        // Will appear first
        console.log('Before');

        // Starting async process and is connected with the logged.on('start'), so 'Starting...' will appear
        this.emit('start');
        cb(); // this logs the 'Hello World' message
        this.emit('finish');
        // Line above finishes async process and is connected with the logged.on('finish'), so 'Finishing...' will appear
        // Then, 'Yes, this is Async :)' will appear

        // Will appear last
        console.log('After');
    }
}

const logger = new Logger();
logger.on('start', () => console.log('Starting...')); // start
logger.on('finish', () => console.log('Finishing...')); // finish
logger.on('finish', () => console.log('Yes, this is Async :)')); // finish
logger.execute(() => console.log('Hello World')); // cb
