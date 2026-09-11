/**
 * Startup file for cPanel/CloudLinux "Setup Node.js App" (Passenger).
 *
 * Passenger needs a plain Node.js file it can run directly — it doesn't run
 * `npm start` / `next start` itself. This file boots the built Next.js app
 * (run `npm run build` first) and listens on the port Passenger assigns via
 * the PORT environment variable.
 *
 * Set this file as the "Application startup file" in the Node.js App panel.
 */
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV === "development";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
