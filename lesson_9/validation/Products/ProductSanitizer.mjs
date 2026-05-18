import { Sanitizer } from "../../utils/sanitizer.mjs";

const productAllowedFields = ["name", "price", "count"];

function sanitizedProductInput(input) {
  return new Sanitizer(productAllowedFields).sanitizeInput(input);
}

export default sanitizedProductInput;
