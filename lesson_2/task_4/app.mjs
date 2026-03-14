// Задача 4. Розробити серверну частину додатку,
// який за відповідними маршрутами (“/”, “/coffee”, “/music”)
// повертає створені HTML документи (розмістіть їх там же, де і додаток),
// що описують: інформацію про себе, інфорімацію про улюблену кав’ярню,
//  інформацію про улюблений музичний гурт.

import { readFile } from "fs/promises";
import { createServer } from "node:http";

const server = createServer(async (req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }

  const filePath = req.url.slice(1);

  const pages = ["coffee", "music", "info"];

  if (!pages.includes(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; utf-8" });
    return res.end("Сторінку не знайдено. Доступні: /coffee, /music, /info");
  }

  if (pages.includes(filePath)) {
    const result = await readFile(`${filePath}.html`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(result);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Сторінку не знайдено!");
  }
});

server.listen(3000, () => {
  console.log("Listening on  http://localhost:3000");
});
