import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../../.env") });

import app from "./app";
import { logger } from "./lib/logger";

const port = Number(process.env["PORT"] ?? 4000);

app.listen(port, () => {
  logger.info({ port }, "Server listening");
});
