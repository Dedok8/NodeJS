import ProductDBServices from "../models/Products/ProductDBServices.mjs";
import { buildFilter } from "../validation/Products/ProductFiters.mjs";
import sanitizedProductInput from "../validation/Products/ProductSanitizer.mjs";

const ALLOWED_SORT_FIELDS = ["price", "name", "count"];

class ProductController {
  static addProductForm(req, res) {
    res.render("products/addProduct", { activePage: "products" });
  }

  static async renderProductList(req, res) {
    try {
      const { sortBy = "price", order = "1" } = req.query;

      const field = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : "price";
      const direction = order === "-1" ? -1 : 1;
      const sort = { [field]: direction };

      const filter = buildFilter(req.query);

      const products = await ProductDBServices.getProductList(filter, sort);

      res.render("products/productsList", {
        products,
        activePage: "products",
        currentSort: { sortBy: field, order },
        currentFilter: filter,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async addProduct(req, res) {
    try {
      const sanitizedData = sanitizedProductInput(req.body);
      await ProductDBServices.addProductDB(sanitizedData);
      res.redirect("/products");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default ProductController;
