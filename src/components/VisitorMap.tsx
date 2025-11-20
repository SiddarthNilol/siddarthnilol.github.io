import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

type Visitor = {
  id?: string;
  lat: number;
  lon: number;
  country?: string;
  city?: string;
  ts?: string;
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const VisitorMap: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadVisitors();
    // send this visit (best-effort)
    void sendThisVisit();
    // poll every 30s to update markers
    const id = setInterval(() => void loadVisitors(), 30000);
    return () => clearInterval(id);
  }, []);

  async function loadVisitors() {
    setLoading(true);
    try {
      const res = await fetch("/api/visitors");
      if (!res.ok) throw new Error("Failed to fetch visitors");
      const json = await res.json();
      setVisitors(json || []);
      setError(null);
    } catch (e: any) {
      console.error(e);
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function sendThisVisit() {
    try {
      // get approximate location by IP (public service)
      const locRes = await fetch("https://ipapi.co/json/");
      if (!locRes.ok) return;
      const loc = await locRes.json();
      const payload: Visitor = {
        lat: parseFloat(loc.latitude) || 0,
        lon: parseFloat(loc.longitude) || 0,
        country: loc.country_name,
        city: loc.city,
        ts: new Date().toISOString(),
      };

      // POST to our visitors endpoint (serverless)
      await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // refresh marker list
      void loadVisitors();
    } catch (e) {
      // silently ignore network errors for this best-effort ping
      console.warn("visitor ping failed", e);
    }
  }

  return (
    <div className="visitor-map">
      <div className="mb-2 text-sm text-muted-foreground">Visitors: {visitors.length}</div>
      {error && <div className="text-sm text-destructive mb-2">{error}</div>}
      <ComposableMap projectionConfig={{ scale: 145 }} width={980} height={520}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6D6" />
            ))
          }
        </Geographies>

        {visitors.map((v, i) => (
          <Marker key={`${v.lat}-${v.lon}-${i}`} coordinates={[v.lon, v.lat]}>
            <g transform="translate(-8, -8)">
              <circle r={6} fill="#ff5252" stroke="#fff" strokeWidth={1} />
            </g>
            <text textAnchor="middle" y={20} style={{ fontFamily: "system-ui", fill: "#333", fontSize: 11 }}>
              {v.country ?? v.city}
            </text>
          </Marker>
        ))}
      </ComposableMap>
      {loading && <div className="text-xs text-muted-foreground">Updating…</div>}
      <div className="text-xs text-muted-foreground mt-2">This demo uses a public IP geolocation service and a server endpoint to persist visits.</div>
    </div>
  );
};

export default VisitorMap;
