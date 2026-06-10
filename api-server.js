#!/usr/bin/env node
/* Local dev server that serves the same handler Vercel runs in production. */
import http from "http";
import visitorsHandler from "./api/visitors.js";

// Deliberately not process.env.PORT — that belongs to the Vite dev server (8080)
const PORT = process.env.API_PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api/visitors")) {
    await visitorsHandler(req, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
