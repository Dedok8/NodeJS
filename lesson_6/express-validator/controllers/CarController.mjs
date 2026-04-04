// Задача 1. Розробити додаток для автопарку (марка авто, рік випуску, номер, зображення)
// з такими функціональними можливостями:
// 1)додавання транспортного засобу
// 2)редагування
// 3)видалення
// 4)виведення списку
// Також є статичні сторінки:
// Home
// about

import { validationResult } from "express-validator";
import Car from "../models/CarModel.mjs";

class CarController {
  static getAllCars(_req, res) {
    try {
      let cars = Car.loadCarList();

      res.render("cars/carList", {
        title: "cart list",
        cars: cars,
      });
    } catch (error) {
      res.status(500).render("error", {
        message: "Помилка при завантаженні автомобілів",
        error,
      });
    }
  }

  static getCarById(req, res) {
    try {
      const car = Car.loadCarById(req.params.id);

      res.render("cars/carInfo", {
        title: "car info",
        car,
      });
    } catch (error) {
      res.status(500).render("error", {
        message: "Помилка при завантаженні Id",
        error,
      });
    }
  }
  static getForm(req, res) {
    try {
      const car = req.params.id ? Car.loadCarById(req.params.id) : null;

      res.render("cars/carForm", { title: "car form", car, errors: [] });
    } catch (error) {
      res.status(500).render("error", { message: "Помилка форми", error });
    }
  }
  static createCar(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("cars/carForm", {
          errors: errors.array(),
          car: req.body,
        });
      }

      const carData = req.body;
      if (req.file) {
        carData.image = req.file.filename;
      }
      Car.createCar(carData);
      res.redirect("/cars");
    } catch (error) {
      res.status(500).render("error", {
        message: "Помилка при додаванні",
        error,
      });
    }
  }
  static updateCar(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("cars/carForm", {
          errors: errors.array(),
          car: { ...req.body, id: req.params.id },
        });
      }

      const carId = req.params.id || req.body.id;

      const carData = { ...req.body };

      if (req.file) {
        carData.image = req.file.filename;
      }

      Car.updateCar(carId, carData);
      res.redirect("/cars");
    } catch (error) {
      res.status(500).render("error", {
        message: "Помилка при оновлені автомобіля",
        error,
      });
    }
  }
  static deleteCarById(req, res) {
    try {
      Car.deleteById(req.params.id);
      res.redirect("/cars");
    } catch (error) {
      res.status(500).render("error", {
        message: "Помилка при видалені",
        error,
      });
    }
  }
}

export default CarController;
