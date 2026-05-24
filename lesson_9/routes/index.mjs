import homeRouter from "./homeRouter.mjs";
import productRouter from "./productRouter.mjs";
import userRouter from "./userRouter.mjs";

const routerConfig = [
  {
    path: "/",
    router: homeRouter,
  },
  {
    path: "/products",
    router: productRouter,
  },
  {
    path: "/",
    router: userRouter,
  },
];

function initRouter(app) {
  for (const config of routerConfig) {
    app.use(config.path, config.router);
  }
}

export default initRouter;
