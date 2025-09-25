const http = require("http");
const routed = require("./routes");

const server = http.createServer(routed);

server.listen(3000);
