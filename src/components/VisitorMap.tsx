import { useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

type Visitor = {
  lat: number;
  lon: number;
  country?: string;
  city?: string;
  ts?: string;
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const PING_KEY = "visitor-ping-date";

type Cluster = {
  lat: number;
  lon: number;
  count: number;
  label: string;
};

function clusterVisitors(visitors: Visitor[]): Cluster[] {
  const buckets = new Map<string, Cluster>();
  for (const v of visitors) {
    if (typeof v.lat !== "number" || typeof v.lon !== "number") continue;
    // ~100km buckets so repeat visits from one city render as one marker
    const key = `${v.lat.toFixed(0)},${v.lon.toFixed(0)}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      buckets.set(key, {
        lat: v.lat,
        lon: v.lon,
        count: 1,
        label: [v.city, v.country].filter(Boolean).join(", ") || "Unknown",
      });
    }
  }
  return [...buckets.values()];
}

const VisitorMap = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [me, setMe] = useState<Visitor | null>(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadVisitors() {
      try {
        const res = await fetch("/api/visitors");
        if (!res.ok) throw new Error(`visitors fetch failed: ${res.status}`);
        const json = await res.json();
        if (!cancelled && Array.isArray(json)) {
          setVisitors(json);
          setLive(true);
        }
      } catch (e) {
        console.warn("visitor sync unavailable", e);
        if (!cancelled) setLive(false);
      }
    }

    async function pingAndLoad() {
      try {
        const locRes = await fetch("https://ipapi.co/json/");
        if (!locRes.ok) return;
        const loc = await locRes.json();
        const lat = parseFloat(loc.latitude);
        const lon = parseFloat(loc.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

        const payload: Visitor = {
          lat,
          lon,
          country: loc.country_name,
          city: loc.city,
          ts: new Date().toISOString(),
        };
        if (!cancelled) setMe(payload);

        // Record each browser at most once per day to keep counts honest
        const today = new Date().toISOString().slice(0, 10);
        if (localStorage.getItem(PING_KEY) !== today) {
          const res = await fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            localStorage.setItem(PING_KEY, today);
            void loadVisitors();
          }
        }
      } catch (e) {
        console.warn("visitor ping skipped", e);
      }
    }

    void loadVisitors();
    void pingAndLoad();

    return () => {
      cancelled = true;
    };
  }, []);

  const clusters = useMemo(() => clusterVisitors(visitors), [visitors]);
  const countries = useMemo(
    () => new Set(visitors.map((v) => v.country).filter(Boolean)).size,
    [visitors]
  );
  const totalVisits = visitors.length + (live ? 0 : me ? 1 : 0);

  return (
    <section id="visitors" className="py-24 relative">
      <div className="aurora w-96 h-96 bg-accent/10 top-20 -left-32" aria-hidden="true"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto mb-12">
          <p className="eyebrow">// 03 — global reach</p>
          <h2 className="section-title">
            Visitor <span className="gradient-text">Map</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Every dot is someone who stopped by — including you
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg">
            <div>
              <div className="font-display text-3xl font-bold gradient-text">{totalVisits}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">visits logged</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold gradient-text">{Math.max(countries, me ? 1 : 0)}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">countries</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-foreground">
                <span className={live ? "text-work" : "text-muted-foreground"}>●</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                {live ? "live sync" : "local only"}
              </div>
            </div>
          </div>

          <div className="signal-card p-2 md:p-4 overflow-hidden">
            <ComposableMap
              projectionConfig={{ scale: 150 }}
              width={860}
              height={440}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(245 22% 12%)"
                      stroke="hsl(245 20% 20%)"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "hsl(245 22% 16%)", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {clusters.map((c) => (
                <Marker key={`${c.lat}-${c.lon}`} coordinates={[c.lon, c.lat]}>
                  <circle className="marker-pulse" r={5} fill="hsl(258 90% 68% / 0.5)" />
                  <circle
                    r={Math.min(3 + Math.sqrt(c.count), 7)}
                    fill="hsl(258 90% 68%)"
                    stroke="hsl(246 30% 5%)"
                    strokeWidth={1}
                  >
                    <title>{`${c.label} — ${c.count} visit${c.count > 1 ? "s" : ""}`}</title>
                  </circle>
                </Marker>
              ))}

              {me && (
                <Marker coordinates={[me.lon, me.lat]}>
                  <circle className="marker-pulse" r={6} fill="hsl(185 95% 55% / 0.5)" />
                  <circle r={4.5} fill="hsl(185 95% 55%)" stroke="hsl(246 30% 5%)" strokeWidth={1}>
                    <title>{`You — ${[me.city, me.country].filter(Boolean).join(", ")}`}</title>
                  </circle>
                </Marker>
              )}
            </ComposableMap>
          </div>

          <p className="font-mono text-xs text-muted-foreground mt-4">
            <span className="text-accent">●</span> you &nbsp;
            <span className="text-primary">●</span> past visitors · approximate locations via IP, no
            personal data stored
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisitorMap;
