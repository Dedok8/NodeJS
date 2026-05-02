class HeaderController {
  static getHomePage(_req, res, next) {
    const filePath = path.join(process.cwd(), "public", "pages", "home.html");
    res.sendFile(filePath, (err) => {
      if (err) return next(err);
    });
  }
  static getAboutPage(_req, res, next) {
    const filePath = path.join(process.cwd(), "public", "pages", "about.html");
    res.sendFile(filePath, (err) => {
      if (err) return next(err);
    });
  }
}

export default HeaderController;
