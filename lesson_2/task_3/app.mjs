// Задача 3. Через параметри запиту передають операцію (add, subtract, mult) і числа (розділені дефісами),
// які треба опрацювати. Знайти результат і повернути користувачу. Наприклад при запиті:
// http://localhost:3000/add/12-4-23-45   - треба знайти суму чисел 12,4,23,45

import { createServer } from "node:http";

const server = createServer((req, res) => {
  const parts = req.url.split("/");
  const operation = parts[1];

  const numbers = parts
    .at(-1)
    .split("-")
    .map(Number)
    .filter((n) => !isNaN(n));

  if (!numbers.length) {
    res.writeHead(400, { "Content-Type": "text/plain; utf-8" });
    return res.end(
      "Помилка: передайте числа через дефіс. Наприклад: /add/10-20-30"
    );
  }

  let result;

  switch (true) {
    case operation === "add":
      result = numbers.reduce((sum, el) => sum + el, 0);
      break;

    case operation === "subtract":
      result = numbers.reduce((acc, n, i) => (i === 0 ? acc : acc - n));
      break;

    case operation === "mult":
      result = numbers.reduce((n, el) => n * el, 1);
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain; utf-8" });
      return res.end();
  }
  res.writeHead(200, { "Content-Type": "text/plain; utf-8" });
  res.end(
    `Числа: [${numbers.join(", ")}]\n Результат (${operation}): ${result}`
  );
});

server.listen(3000, () => {
  console.log("Listening on  http://localhost:3000");
});
