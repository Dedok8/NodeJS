import UserDBServices from "../models/Users/UserDBServices.mjs";
import sanitizedUserInput from "../validation/Users/UserSanitizer.mjs";

class UserController {
  static async renderUserList(req, res) {
    try {
      const users = await UserDBServices.getUserList();
      res.render("users/userList", { users, activePage: "users" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static renderLoginForm(req, res) {
    res.render("users/login", { activePage: "login" });
  }

  static async login(req, res) {
    try {
      const sanitizedData = sanitizedUserInput(req.body);
      const user = await UserDBServices.getUserList({
        name: sanitizedData.name,
      });

      if (!user.length) {
        return res.status(400).send("Користувача не знайдено");
      }

      req.session.username = sanitizedData.name;
      req.session.sort = { price: 1 };
      res.redirect("/products");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static renderRegisterForm(req, res) {
    res.render("users/register", { activePage: "login" });
  }

  static async register(req, res) {
    try {
      const sanitizedData = sanitizedUserInput(req.body);
      await UserDBServices.addUserDB(sanitizedData);
      res.redirect("/login");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default UserController;
