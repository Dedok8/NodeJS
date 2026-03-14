// Задача 5. Створити додаток з історією. У файлі json зберігаємо усі роути та кількість відвідувань.
// У налаштуваннях settings.json зберігати який роут треба використати для перегляду
//  історії та назву файлу де зберігається історія

import { createServer } from "node:http";
import fs from "fs";

const settings = JSON.parse(fs.readFileSync("settings.json", "utf8"));

const historyFile = settings.historyFilePath;
const historyRoute = settings.historyRoute;

function readHistory() {
  if (!fs.existsSync(historyFile)) {
    fs.writeFileSync(historyFile, "{}");
  }
  return JSON.parse(fs.readFileSync(historyFile, "utf8"));
}

function saveHistory(data) {
  fs.writeFileSync(historyFile, JSON.stringify(data, null, 2));
}

const server = createServer((req, res) => {
  const url = req.url.replace("/");
  const history = readHistory();

  if (req.url === historyRoute) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(history, null, 2));
    return;
  }

  if (!(url in history)) {
    res.end(console.log("Такого роута не існує"));
    return;
  }

  history[url]++;

  saveHistory(history);

  res.end(`Ви відкрили ${url}`);
});

server.listen(3000, () => {
  console.log("Server started: http://localhost:3000");
});
