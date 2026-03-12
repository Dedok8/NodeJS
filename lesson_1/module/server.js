import { createServer } from "node:http";
import readData from "./readData.js";

const server = createServer((req, res) => {
  const role = req.url.slice(1);

  const result = readData(role);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(result);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on http://127.0.0.1:3000");
});
