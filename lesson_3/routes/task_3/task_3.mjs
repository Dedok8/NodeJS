// Задача 3. Розробити програму з такими функціональними можливостями:
// обробка статичних маршрутів:
// “/”
// Вітання користувача
// “/goals”
// Ваші цілі

// обробка статичних файлів:
// about
// містить тему та умову задачі
// news
// містить перелік важливі новини (для Вас)

// обробка параметрів запитів:
// /info/:myLinks
// у залежності від значення параметра повертає сторінку з :
// «sites» -  адресами улюблених сайтів
// «films» -  адреси улюблених онлайн кінотеатрі
// «me» - або інформацію про себе
import { Router } from "express";

const router = new Router();

router.get("/", (_req, res) => {
  res.render("index", { title: "Вітання користувача" });
});

router.get("/goals", (_req, res) => {
  res.render("task_3/goals", { title: "Ваші цілі" });
});

router.get("/about", (_req, res) => {
  res.render("task_3/about", { title: "Про задачу" });
});

router.get("/news", (_req, res) => {
  res.render("task_3/news", { title: "Новини" });
});

router.get("/info/:myLink", (req, res) => {
  const { myLink } = req.params;

  switch (myLink) {
    case "sites":
      res.render("task_3/sites", { title: "Улюблені сайти" });
      break;
    case "films":
      res.render("task_3/films", { title: "Улюблені кінотеатри" });
      break;
    case "me":
      res.render("task_3/me", { title: "Про мене" });
      break;
    default:
      res.status(404).send("Not Found");
      break;
  }
});

export default router;
