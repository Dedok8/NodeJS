import UserDBServices from "../models/Users/UserDBServices.mjs";
import sanitizedUserInput from "../validation/Users/UserSanitizer.mjs";
import passport from "../config/passport.mjs";
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

  static async login(req, res, next) {
    if (req.validationErrors) {
      return res.status(400).render("users/login", {
        activePage: "login",
        validationErrors: req.validationErrors,
        body: req.body,
      });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).render("users/login", {
          activePage: "login",
          validationErrors: [info.message],
          body: req.body,
        });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect("/products");
      });
    })(req, res, next);
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
