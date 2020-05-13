const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!');
}).listen(8000, 'localhost', () => console.log('Server listening on port 8000'));
