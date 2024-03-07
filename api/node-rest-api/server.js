const http = require('http')
const url = require('url')

const PORT = 3000

let data = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' }
];

// Create HTTP Server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)

    const path = parsedUrl.pathname

    const method = req.method.toLowerCase()

    if (path === '/users' && method === 'get') {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(data))
    }
    else if (path === '/users' && method === 'post') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const newUser = JSON.parse(body)
            data.push(newUser)
            res.writeHead(201, { 'Content-Type' : 'application/json' })
            res.end(JSON.stringify(newUser))
        })
    }
    else {
        res.writeHead(404, { 'Content-Type' : 'application/json'})
        res.end(JSON.stringify({ message : 'Route not found' }))
    }
})

server.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}')
})