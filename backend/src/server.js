import http from 'http'; // import the built-in HTTP module
import app from './app.js'; // import the Express app

const hostname = '127.0.0.1'; // localhost
const port = 3000; // port number

const server = http.createServer(app); // create an HTTP server using the Express app
 
/*
// compared to app, this is a basic HTTP server
(req, res) => { // create an HTTP server
  res.statusCode = 200; // HTTP status code 200 means OK
  res.setHeader('Content-Type', 'text/plain'); // set content type to plain text
  res.end('Hello, World!\n'); // send response and end the connection
  */

server.listen(port, hostname, () => { // server listens on specified hostname and port
  console.log(`Server running at http://${hostname}:${port}/`); // log message when server starts
});