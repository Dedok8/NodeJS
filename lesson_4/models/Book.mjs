import dataFileManager from "../services/dataFileManager.mjs";

class Book {
  static loadList() {
    return dataFileManager.loadData();
  }
  static loadById(id) {
    return dataFileManager.getItemById(id);
  }
  static createBook(data) {
    dataFileManager.addItem({
      id: new Date().getTime(),
      ...data,
    });
  }
  static update(id, data) {
    dataFileManager.updateItemById(id, data);
  }
  static deleteById(id) {
    dataFileManager.deleteItemById(id);
  }
}

export default Book;
