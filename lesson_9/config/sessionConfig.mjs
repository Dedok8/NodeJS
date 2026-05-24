import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./default.mjs";

const isProd = process.env.NODE_ENV === "production";

const sessionConfig = session({
  name: "sid",
  secret: config.secretSessionKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: config.mongoURI }),
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 1000 * 60 * 10,
  },
});

export default sessionConfig;
