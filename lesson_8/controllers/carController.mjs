import * as carService from "../services/CarService.mjs";
import * as carTypeService from "../services/CarTypeService.mjs";

class CarController {
  static async carList(req, res) {
    try {
      const cars = await carService.getAllCars();

      res.render("carsList", { cars });
    } catch (error) {
      res.status(500).send("Помилка при отримання машин");
    }
  }

  static async addForm(req, res) {
    const id = req.params.id;
    let car = null;

    if (id) {
      try {
        car = await carService.getCarById(id);
      } catch (error) {
        car = null;
      }
    }

    const typesList = await carTypeService.getAllTypes();

    res.render("addForm", {
      data: car,
      typesList,
      errors: null,
    });
  }

  static async addCar(req, res) {
    const { brand, year, plateNumber, type } = req.validatedData;

    try {
      if (req.params.id) {
        await carService.updataCar(req.params.id, {
          brand,
          year,
          plateNumber,
          type,
        });
      } else {
        await carService.createCar({ brand, year, plateNumber, type });
      }
      res.redirect("/cars");
    } catch (error) {
      res.status(500).send("Помилка збереження авто");
    }
  }

  static async deleteCar(req, res) {
    try {
      await carService.deleteCar(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  }
}

export default CarController;
