import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import UserDBServices from "../models/Users/UserDBServices.mjs";

passport.use(
  new LocalStrategy({ usernameField: "name" }, async (name, password, done) => {
    try {
      const user = await UserDBServices.getUserByName(name);
      if (!user)
        return done(null, false, { message: "Користувача не знайдено" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Невірний пароль" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserDBServices.getById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
