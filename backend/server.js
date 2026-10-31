import { createServer } from "node:http";
import { connectDatabase } from "./src/config/database.js";
import { loadEnv } from "./src/config/env.js";
import { createApp } from "./src/app.js";

let env;
try { env = loadEnv(); }
catch (error) { console.error(`Backend configuration error: ${error.message}`); process.exit(1); }
try { await connectDatabase(env.mongoUri); }
catch (error) {
  const code = error?.code || error?.name || "unknown error";
  console.error(`MongoDB connection failed (${code}). Check MONGODB_URI and database network access.`);
  process.exit(1);
}
const app = createApp(env);
const server = createServer(app);
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Backend could not start: port ${env.port} is already in use. Stop the existing backend or configure PORT.`);
  } else {
    console.error(`Backend could not start listening (${error.code || error.name || "unknown error"}).`);
  }
  process.exit(1);
});
server.listen(env.port, env.host, () => {
  console.log(`Shenron Global server listening on ${env.host}:${env.port} (${env.nodeEnv})`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
