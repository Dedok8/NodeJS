import { escapeRegex } from "../../utils/helpers.mjs";

export const ALLOWED_USER_FILTERS = {
  name: (v) => {
    const raw = String(v ?? "").trim();
    if (!raw) return null;
    return { name: { $regex: escapeRegex(raw), $options: "i" } };
  },
};

export function buildUserFilter(query) {
  const conditions = [];

  for (const [key, handler] of Object.entries(ALLOWED_USER_FILTERS)) {
    if (query[key] === undefined) continue;
    const condition = handler(query[key]);
    if (condition) conditions.push(condition);
  }

  return conditions.length ? { $and: conditions } : {};
}
