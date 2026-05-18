import { escapeRegex, parseNumber } from "../../utils/helpers.mjs";

export const ALLOWED_PRODUCT_FILTERS = {
  name: (v) => {
    const raw = String(v ?? "").trim();
    if (!raw) return null;
    return { name: { $regex: escapeRegex(raw), $options: "i" } };
  },

  minPrice: (v) => {
    const n = parseNumber(v);
    if (n === null || n < 0) return null;
    return { price: { $gte: n } };
  },

  maxPrice: (v) => {
    const n = parseNumber(v);
    if (n === null || n < 0) return null;
    return { price: { $lte: n } };
  },

  minCount: (v) => {
    const n = parseNumber(v);
    if (n === null || n < 0) return null;
    return { count: { $gte: n } };
  },

  maxCount: (v) => {
    const n = parseNumber(v);
    if (n === null || n < 0) return null;
    return { count: { $lte: n } };
  },
};

export function buildFilter(query) {
  const conditions = [];

  for (const [key, handler] of Object.entries(ALLOWED_PRODUCT_FILTERS)) {
    if (query[key] === undefined) continue;
    const condition = handler(query[key]);
    if (condition) conditions.push(condition);
  }

  return conditions.length ? { $and: conditions } : {};
}
