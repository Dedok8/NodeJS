import MongooseCRUDManager from "../../services/MongooseCRUDManager.mjs";
import Product from "./ProductSchema.mjs";

class ProductDBServices extends MongooseCRUDManager {
  constructor() {
    super(Product);
  }

  async getProductList(filter = {}, sort = { price: 1 }) {
    try {
      const count = await Product.countDocuments();
    
      return await Product.find(filter).sort(sort).lean().exec();
    } catch (error) {
      throw new Error("Помилка при отримані продуктів: " + error.message);
    }
  }

  async addProductDB(data) {
    try {
      await super.create(data);
    } catch (error) {
      throw new Error("Помилка при додаванні продуктів: " + error.message);
    }
  }
}

export default new ProductDBServices();
