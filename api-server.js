#!/usr/bin/env node
const http = require("http");
const visitorsHandler = require("./api/visitors.js");

const PORT = process.env.PORT || 3000;

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
