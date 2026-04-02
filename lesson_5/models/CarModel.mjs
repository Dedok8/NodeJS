import DataFileManager from "../services/dataFileManager.mjs";

class Car {
  static loadCarList() {
    return DataFileManager.loadData();
  }
  static loadCarById(id) {
    return DataFileManager.getItemById(id);
  }
  static createCar(data) {
    DataFileManager.addItem({
      id: new Date().getTime(),
      ...data,
    });
  }
  static updateCar(id, data) {
    DataFileManager.updateItemById(id, data);
  }
  static deleteById(id) {
    DataFileManager.deleteItemById(id);
  }
}

export default Car;
