import dataFileManager from "../services/dataFileManager.mjs";

class Car {
  static loadCarList() {
    return dataFileManager.loadData();
  }
  static loadCarById(id) {
    return dataFileManager.getItemById(id);
  }
  static createCar(data) {
    dataFileManager.addItem({
      id: new Date().getTime(),
      ...data,
    });
  }
  static updateCar(id, data) {
    dataFileManager.updateItemById(id, data);
  }
  static deleteById(id) {
    dataFileManager.deleteItemById(id);
  }
}

export default Car;
