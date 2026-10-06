const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from CheerLoop");
});

server.listen(5000, () => {
  console.log("Server is definitely running on port 5000");
});