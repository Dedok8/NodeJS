import session from "express-session";
import config from "./default.mjs";

const isProd = process.env.NODE_ENV === "production";

const sessionConfig = session({
  name: "sid",
  secret: config.secretSessionKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 1000 * 60 * 10,
  },
});

console.log(config.secretSessionKey);
export default sessionConfig;
