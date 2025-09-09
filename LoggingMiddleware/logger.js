import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs folder exists
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Log file
const logFile = path.join(logDir, "requests.log");

export default function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    } ${res.statusCode} - ${duration}ms - IP:${
      req.ip
    } - UA:${req.headers["user-agent"]}\n`;

    fs.appendFile(logFile, logEntry, (err) => {
      if (err) {
        fs.appendFileSync(
          path.join(logDir, "logger-error.log"),
          `[${new Date().toISOString()}] Failed to write log\n`
        );
      }
    });
  });

  next();
}
