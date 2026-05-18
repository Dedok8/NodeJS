import MongooseCRUDManager from "../../services/MongooseCRUDManager.mjs";
import User from "./UserSchema.mjs";

class UserDBServices extends MongooseCRUDManager {
  constructor() {
    super(User);
  }

  async getUserList(filter = {}) {
    try {
      return await super.getList(filter);
    } catch (error) {
      throw new Error("Помилка отримання користувачів:" + error.message);
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
