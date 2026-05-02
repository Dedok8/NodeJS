import Car from "../models/CarModel.mjs";

class CarController {
  static async getAllCars(_req, res) {
    try {
      const cars = await Car.find();
      res.render("cars/carList", { title: "car list", cars });
    } catch (error) {
      res.status(500).render("error", {
        message: "Помилка при завантаженні автомобілів",
        error,
      });
    }
  }

  static async getCarById(req, res) {
    try {
      const car = await Car.findById(req.params.id);
      res.render("cars/carInfo", { title: "car info", car });
    } catch (error) {
      res
        .status(500)
        .render("error", { message: "Помилка при завантаженні Id", error });
    }
  }

  static async getForm(req, res) {
    try {
      const car = req.params.id ? await Car.findById(req.params.id) : null;
      res.render("cars/carForm", { title: "car form", car });
    } catch (error) {
      res.status(500).render("error", { message: "Помилка форми", error });
    }
  }

  static async createCar(req, res) {
    try {
      const carData = { ...req.validatedData };
      if (req.file) carData.image = req.file.filename;
      await Car.create(carData);
      res.redirect("/cars");
    } catch (error) {
      res
        .status(500)
        .render("error", { message: "Помилка при додаванні", error });
    }
  }

  static async updateCar(req, res) {
    try {
      const carData = { ...req.body };
      if (req.file) carData.image = req.file.filename;
      await Car.findByIdAndUpdate(req.params.id, carData);
      res.redirect("/cars");
    } catch (error) {
      res
        .status(500)
        .render("error", { message: "Помилка при оновленні", error });
    }
  }

  static async deleteCarById(req, res) {
    try {
      await Car.findByIdAndDelete(req.params.id);
      res.redirect("/cars");
    } catch (error) {
      res
        .status(500)
        .render("error", { message: "Помилка при видаленні", error });
    }
  }
}

export default CarController;
