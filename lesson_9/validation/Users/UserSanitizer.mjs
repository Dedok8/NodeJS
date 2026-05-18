import { Sanitizer } from "../../utils/sanitizer.mjs";

const userAllowedFields = ["name", "password"];

function sanitizedUserInput(input) {
  return new Sanitizer(userAllowedFields).sanitizeInput(input);
}

export default sanitizedUserInput;
