// Задача 2. Користувач через роут ‘/save_num/число’ може передати на сервер якесь число.
// Ці числа поступово треба зберігати у текстовому файлі numbers.txt. Наприклад, використовуючи такий роут:
// http://localhost:3000/save_num/78  -  у файл треба додати число 78.
// А використовуючи роути  ‘/sum’ – знайти суму, ‘mult’ –знайти добуток.
// За роутом «/remove» файл треба видалити.

import { createServer } from "node:http";
import fs from "fs/promises";

const filePath = "numbers.txt";

const server = createServer(async (req, res) => {
  const url = req.url;

  if (url.startsWith("/save_num/")) {
    const num = Number(url.split("/save_num/")[1]);

    if (isNaN(num)) {
      console.log("Введіть число");
    }

    await fs.appendFile(filePath, num + "\n", "utf-8");
    res.writeHead(200, { "Content-Type": "text/plain; utf-8" });
    return res.end(`Число ${num} збережено у файл.`);
  }

  if (url.startsWith("/sum")) {
    const numbers = await readNumbers();
    const sum = numbers.reduce((sum, el) => sum + el, 0);
    res.writeHead(200, { "Content-Type": "text/plain; utf-8" });
    return res.end(`Сума: ${sum}\n `);
  }

  if (url.startsWith("/mult")) {
    const numbers = await readNumbers();
    const mult = numbers.reduce((el, n) => el * n, 1);
    res.writeHead(200, { "Content-Type": "text/plain; utf-8" });
    return res.end(`Добуток: ${mult}`);
  }

  if (url.startsWith("/remove")) {
    try {
      await fs.unlink(filePath);
      res.writeHead(200, { "Content-Type": "text/plain; utf-8" });
      return res.end(`Файл ${FILE} видалено`);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain; utf-8" });
      return res.end(`Файл ${filePath} видалено`);
    }
  }
  res.writeHead(404, { "Content-Type": "text/plain; utf-8" });
  res.end(
    "Роут не знайдено.\n Доступні: /save_num/число, /sum, /mult, /remove"
  );
});

async function readNumbers() {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content.split("\n").map(Number);
  } catch (error) {
    return [];
  }
}

server.listen(3000,  () => {
  console.log("Listening on  http://localhost:3000");
});
