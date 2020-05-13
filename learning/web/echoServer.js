const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    if (req.method === 'POST' && req.url === '/echo') {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Hello World!');
    } else {
        res.statusCode = 404;
        res.end();
    }
}).listen(8001, 'localhost', () => console.log('Server listening on port 8001'));
