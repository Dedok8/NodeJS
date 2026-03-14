// Задача 1. У консольний додаток передають через параметр пенсійний вік. Наприклад
// node app.mjs –-pension=65
// Потім питаємо у терміналі користувача скільки йому років (використати “readline”) і кажемо чи він є пенсіонером.

import readline from "readline";

const rawArgs = process.argv.slice(2).join("&");
const params = new URLSearchParams(rawArgs);

if (!params.has("pension")) {
  console.error("Вкажіть ключ правильно");
  process.exit(1);
}

const pensionAge = Number(params.get("pension"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Скільки вам років? ", (answer) => {
  const userAge = Number(answer);

  if (Number.isNaN(userAge) || userAge <= 0) {
    console.error("Помилка: введіть коректний вік");
  } else if (userAge >= pensionAge) {
    console.log(`Вам ${userAge} років - ви є пенсіонером`);
  } else {
    console.log(`Вам ${userAge} років - ви не є пенсіонером`);
  }

  rl.close();
});
