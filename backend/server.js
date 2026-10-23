import { createServer } from "node:http";
import { connectDatabase } from "./src/config/database.js";
import { loadEnv } from "./src/config/env.js";
import { createApp } from "./src/app.js";

let env;
try { env = loadEnv(); }
catch (error) { console.error(`Backend configuration error: ${error.message}`); process.exit(1); }
try { await connectDatabase(env.mongoUri); }
catch { console.error("MongoDB connection failed. Check MONGODB_URI and database network access."); process.exit(1); }
const app = createApp(env);
const server = createServer(app);
server.listen(env.port, () => {
  console.log(`Shenron blog API listening on port ${env.port} (${env.nodeEnv})`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
