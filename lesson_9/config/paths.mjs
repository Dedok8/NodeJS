import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootDir = path.resolve(__dirname, "..");
export const viewsDir = path.join(rootDir, "views");
export const publicDir = path.join(rootDir, "public");
