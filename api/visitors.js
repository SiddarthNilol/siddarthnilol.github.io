/*
  Visitors endpoint (Vercel serverless function).
  - GET: returns JSON array of saved visitors
  - POST: accepts { lat, lon, country, city, ts } and appends it

  Storage:
  1. If Upstash/Vercel KV env vars are set (KV_REST_API_URL/KV_REST_API_TOKEN or
     UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN), visits persist durably in Redis.
  2. Otherwise falls back to /tmp — the only writable path in Vercel functions —
     which survives warm invocations but resets on cold starts/deploys.
  The function never writes to the deployment directory (it is read-only in production).
*/

import fs from "fs";

const TMP_FILE = "/tmp/visitors.json";
const REDIS_KEY = "visitors";
const MAX_VISITORS = 500;

// Baseline entries shown before any durable storage is configured
const SEED = [
  { lat: 40.7467, lon: -74.0574, country: "United States", city: "Jersey City", ts: "2026-01-19T21:23:40.734Z" },
];

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redisCommand(config, command) {
  const res = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error(`redis command failed: ${res.status}`);
  const json = await res.json();
  return json.result;
}

async function redisList(config) {
  const items = await redisCommand(config, ["LRANGE", REDIS_KEY, "0", "-1"]);
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      try {
        return JSON.parse(item);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

async function redisAppend(config, visitor) {
  await redisCommand(config, ["RPUSH", REDIS_KEY, JSON.stringify(visitor)]);
  await redisCommand(config, ["LTRIM", REDIS_KEY, String(-MAX_VISITORS), "-1"]);
}

function tmpList() {
  try {
    const raw = fs.readFileSync(TMP_FILE, "utf8");
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr;
  } catch {
    // missing or corrupt tmp file — fall through to seed
  }
  return [...SEED];
}

function tmpAppend(visitor) {
  const arr = tmpList();
  arr.push(visitor);
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(arr.slice(-MAX_VISITORS)));
  } catch (e) {
    console.warn("tmp write failed", e);
  }
}

function sanitizeVisitor(data) {
  const lat = Number(data.lat);
  const lon = Number(data.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return {
    // round coordinates to ~1km so exact locations are never stored
    lat: Math.round(lat * 100) / 100,
    lon: Math.round(lon * 100) / 100,
    country: typeof data.country === "string" ? data.country.slice(0, 64) : undefined,
    city: typeof data.city === "string" ? data.city.slice(0, 64) : undefined,
    ts: new Date().toISOString(),
  };
}

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  const redis = redisConfig();

  if (req.method === "GET") {
    let visitors = [];
    try {
      visitors = redis ? await redisList(redis) : tmpList();
    } catch (e) {
      console.error("visitor read failed", e);
      visitors = [...SEED];
    }
    res.statusCode = 200;
    res.end(JSON.stringify(visitors.slice(-MAX_VISITORS)));
    return;
  }

  if (req.method === "POST") {
    try {
      let body = req.body;
      if (!body || typeof body === "string") {
        let raw = typeof body === "string" ? body : "";
        if (!raw) for await (const chunk of req) raw += chunk;
        body = JSON.parse(raw || "{}");
      }

      const visitor = sanitizeVisitor(body);
      if (!visitor) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "lat and lon are required and must be valid coordinates" }));
        return;
      }

      if (redis) {
        await redisAppend(redis, visitor);
      } else {
        tmpAppend(visitor);
      }
      res.statusCode = 201;
      res.end(JSON.stringify({ ok: true, durable: Boolean(redis) }));
    } catch (e) {
      console.error("visitor write failed", e);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "failed to record visit" }));
    }
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: "Method not allowed" }));
};
