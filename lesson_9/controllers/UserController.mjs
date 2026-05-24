import UserDBServices from "../models/Users/UserDBServices.mjs";
import sanitizedUserInput from "../validation/Users/UserSanitizer.mjs";
import bcrypt from "bcrypt";
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
    if (req.validationErrors) {
      return res.status(400).render("users/login", {
        activePage: "login",
        validationErrors: req.validationErrors,
        body: req.body,
      });
    }
    try {
      const sanitizedData = sanitizedUserInput(req.body);
      const user = await UserDBServices.getUserByName(sanitizedData.name);

      if (!user) {
        return res.status(400).send("Користувача не знайдено");
      }

      const isMatch = await bcrypt.compare(
        sanitizedData.password,
        user.password
      );
      if (!isMatch) {
        return res.status(400).send("Невірний пароль");
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
