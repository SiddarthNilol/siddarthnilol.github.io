/*
  Simple serverless visitors endpoint (Node). Accepts GET and POST.
  - GET: returns JSON array of saved visitors
  - POST: accepts JSON body with { lat, lon, country, city, ts } and appends to data/visitors.json

  Notes:
  - This file is a simple example intended for Vercel/Netlify Functions or other Node-based serverless deployments.
  - Writing to a file in serverless environments may not persist across instances — use a DB for production (Firestore, Supabase, DynamoDB).
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data");
const FILE = path.join(DATA_PATH, "visitors.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_PATH)) fs.mkdirSync(DATA_PATH, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify([]));
}

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  ensureDataDir();
  if (req.method === "GET") {
    const raw = fs.readFileSync(FILE, "utf8");
    try {
      const json = JSON.parse(raw || "[]");
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(json.slice(-100))); // return last 100
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Invalid data file" }));
    }
    return;
  }

  if (req.method === "POST") {
    try {
      let body = "";
      for await (const chunk of req) body += chunk;
      const data = JSON.parse(body || "{}");
      const { lat, lon, country, city, ts } = data;
      if (typeof lat !== "number" || typeof lon !== "number") {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "lat and lon required and must be numbers" }));
        return;
      }
      const raw = fs.readFileSync(FILE, "utf8");
      const arr = JSON.parse(raw || "[]");
      arr.push({ lat, lon, country, city, ts: ts || new Date().toISOString() });
      fs.writeFileSync(FILE, JSON.stringify(arr));
      res.statusCode = 201;
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: String(e) }));
    }
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: "Method not allowed" }));
};
