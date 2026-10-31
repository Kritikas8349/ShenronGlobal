import bcrypt from "bcryptjs";
import { stdin, stdout } from "node:process";

async function readPassword() {
  stdout.write("Enter a new admin password (8+ characters): ");
  let password = "";
  if (stdin.isTTY) stdin.setRawMode(true);
  stdin.resume();
  return new Promise((resolve, reject) => {
    const onData = (chunk) => {
      for (const char of chunk.toString("utf8")) {
        if (char === "\u0003") { cleanup(); reject(new Error("Cancelled.")); return; }
        if (char === "\r" || char === "\n") { cleanup(); resolve(password); return; }
        if (char === "\u007f" || char === "\b") password = password.slice(0, -1);
        else password += char;
      }
    };
    const cleanup = () => { stdin.off("data", onData); if (stdin.isTTY) stdin.setRawMode(false); stdin.pause(); stdout.write("\n"); };
    stdin.on("data", onData);
  });
}

try {
  const password = await readPassword();
  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) throw new Error("Password must be at least 8 characters and no more than 72 UTF-8 bytes.");
  stdout.write(`${await bcrypt.hash(password, 12)}\n`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
