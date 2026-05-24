import MongooseCRUDManager from "../../services/MongooseCRUDManager.mjs";
import User from "./UserSchema.mjs";

class UserDBServices extends MongooseCRUDManager {
  constructor() {
    super(User);
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error("Помилка пошуку користувача: " + error.message);
    }
  }

  async getUserList(filter = {}) {
    try {
      return await super.getList(filter);
    } catch (error) {
      throw new Error("Помилка отримання користувачів:" + error.message);
    }
  }

  async getUserByName(name) {
    try {
      return await this.model.findOne({ name });
    } catch (error) {
      throw new Error("Помилка пошуку користувача: " + error.message);
    }
  }

  async addUserDB(data) {
    try {
      return await super.create(data);
    } catch (error) {
      throw new Error("Помилка додавання користувачів:" + error.message);
    }
  }
}

export default new UserDBServices();
