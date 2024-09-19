import http from "node:http"

// create server
const server = http.createServer((req, res) => {
    // return Hello World when root path is requested else 404
    if (req.url === "/") {
        res.end("Hello World")
    } else {
        res.statusCode = 404
        res.end("Not Found")
    }
})

// listen on port 3000
server.listen(3000)
