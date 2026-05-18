import { escapeRegex } from "./helpers.mjs";

export const ALLOWED_POST_FILTERS = {
  post: (v) => {
    const raw = String(v ?? "").trim();
    if (!raw) return undefined;
    return { post: new RegExp(escapeRegex(raw), "i") };
  },
  authors: (v) => {
    const raw = String(v ?? "").trim();
    if (!raw) return undefined;
    return { authors: raw };
  },
};

export function buildPostFilter(query) {
  const filter = {};
  for (const key in ALLOWED_POST_FILTERS) {
    if (query[key] !== undefined && query[key] !== "") {
      const value = ALLOWED_POST_FILTERS[key](query[key]);
      if (value !== undefined && value !== null) {
        Object.assign(filter, value);
      }
    }
  }
  return filter;
}
