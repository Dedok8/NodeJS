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
      console.log("getForm called, id:", req.params.id);
      const car = req.params.id ? Car.loadCarById(req.params.id) : null;
      console.log("car:", car);
      res.render("cars/carForm", {
        title: "car form",
        car,
      });
    } catch (error) {
      console.log("getForm error:", error.message);
      res.status(500).render("error", {
        message: "Помилка форми",
        error,
      });
    }
  }
  static createCar(req, res) {
    try {
      const carData = { ...req.validatedData };
      console.log("carData перед збереженням:", carData);
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
      const carId = req.params.id;
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
