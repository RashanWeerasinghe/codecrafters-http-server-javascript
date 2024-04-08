const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (yo) => {
    const hi = yo.toString().split("\r\n")[0].split(" ")[1];

    if (hi === "/") {
      socket.write(`HTTP/1.1 200 OK\r\n\r\n`);

      socket.end();

      return;
    } else if (hi.startsWith("/echo/")) {
      const resp = hi.replace("/echo/", "");

      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${resp.length}\r\n\r\n${resp}`
      );

      socket.end();

      return;
    }

    socket.write("HTTP/1.1 404 NOT FOUND\r\n\r\n");
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});
//
server.listen(4221, "localhost");
