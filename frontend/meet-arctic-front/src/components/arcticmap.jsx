import { useEffect, useRef, useState, useCallback } from "react";
import { formatPop } from "./functions"

// Install: npm install leaflet
// In your index.css or App.css add: @import "leaflet/dist/leaflet.css";

const SAMPLE_SETTLEMENTS = [
  { name: "Murmansk", country: "Russia", latitude: 68.9585, longitude: 33.0827, population: 295374 },
  { name: "Longyearbyen", country: "Norway", latitude: 78.2232, longitude: 15.6267, population: 2400 },
  { name: "Alert", country: "Canada", latitude: 82.5018, longitude: -62.3481, population: 5 },
  { name: "Tromsø", country: "Norway", latitude: 69.6496, longitude: 18.956, population: 77203 },
  { name: "Norilsk", country: "Russia", latitude: 69.3558, longitude: 88.1893, population: 182726 },
  { name: "Reykjavík", country: "Iceland", latitude: 64.1355, longitude: -21.8954, population: 131136 },
  { name: "Nuuk", country: "Greenland", latitude: 64.1835, longitude: -51.7216, population: 19604 },
  { name: "Fairbanks", country: "USA", latitude: 64.8401, longitude: -147.72, population: 31516 },
  { name: "Yakutsk", country: "Russia", latitude: 62.0355, longitude: 129.6755, population: 311760 },
  { name: "Iqaluit", country: "Canada", latitude: 63.7467, longitude: -68.517, population: 7740 },
  { name: "Vorkuta", country: "Russia", latitude: 67.4992, longitude: 64.0672, population: 58133 },
  { name: "Hammerfest", country: "Norway", latitude: 70.6634, longitude: 23.6821, population: 10644 },
];

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}



export default function ArcticMap({ settlements = SAMPLE_SETTLEMENTS, count = 9 }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const initializedRef = useRef(false); // guard against Strict Mode double-invoke
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(() => pickRandom(settlements, count));

  // Keep settlements/count in refs so initMap closure always reads latest values
  const settlementsRef = useRef(settlements);
  const countRef = useRef(count);
  useEffect(() => {
    settlementsRef.current = settlements;
    countRef.current = count;
  }, [settlements, count]);

  const renderMarkers = useCallback((items) => {
    const L = window.L;
    if (!mapRef.current || !L) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    items.forEach((s) => {
      const el = document.createElement("div");
      el.style.cssText = `
        width:12px;height:12px;border-radius:50%;
        background:#378ADD;border:2px solid #85B7EB;
        cursor:pointer;transition:transform 0.15s,background 0.15s;
        box-shadow:0 0 8px rgba(55,138,221,0.5);
      `;
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.6)";
        el.style.background = "#85B7EB";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
        el.style.background = "#378ADD";
      });

      const icon = L.divIcon({
        className: "",
        html: el.outerHTML,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const marker = L.marker([s.latitude, s.longitude], { icon }).addTo(mapRef.current);

      marker.on("click", () => {
        setSelected(s);
        mapRef.current.flyTo([s.latitude, s.longitude], 5, { duration: 1.2 });
      });

      markersRef.current.push(marker);
    });
  }, []);

  // Keep visible in a ref so initMap closure always reads latest value
  const visibleRef = useRef(visible);
  useEffect(() => { visibleRef.current = visible; }, [visible]);

  // When settlements prop changes (e.g. loaded async), resample visible
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const next = pickRandom(settlementsRef.current, countRef.current);
    setVisible(next);
    visibleRef.current = next;
  }, [settlements, count]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Strict Mode mounts effects twice in dev — guard with initializedRef
    if (initializedRef.current || !mapContainerRef.current) return;
    initializedRef.current = true;

    const initMap = () => {
      const L = window.L;
      const map = L.map(mapContainerRef.current, {
        center: [66, 20],
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: true,//false,
        worldCopyJump: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      //   attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      //   subdomains: "abcd",
      //   maxZoom: 19,
      // }).addTo(map);

      mapRef.current = map;
      renderMarkers(visibleRef.current);
    };

    if (!document.querySelector("#leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      //link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.href = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      //script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.src = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      initializedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mapRef.current && window.L) {
      renderMarkers(visible);
    }
  }, [visible, renderMarkers]); // exhaustive-deps satisfied

  const shuffle = () => {
    setVisible(pickRandom(settlements, count));
    setSelected(null);
    if (mapRef.current) {
      mapRef.current.flyTo([66, 20], 2, { duration: 1 });
    }
  };

  const flyTo = (s) => {
    setSelected(s);
    if (mapRef.current) {
      mapRef.current.flyTo([s.latitude, s.longitude], 5, { duration: 1.2 });
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: "relative" }}>
        <div
          ref={mapContainerRef}
          style={{
            width: "100%",
            height: "460px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "0.5px solid #1a2a3a",
          }}
        />

        {selected && (
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              background: "rgba(4,44,83,0.96)",
              backdropFilter: "blur(12px)",
              borderRadius: "10px",
              padding: "14px 18px",
              color: "white",
              minWidth: "210px",
              border: "0.5px solid rgba(133,183,235,0.3)",
              zIndex: 1000,
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: "8px",
                right: "10px",
                background: "none",
                border: "none",
                color: "#85B7EB",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#85B7EB",
                marginBottom: "4px",
              }}
            >
              {selected.country}
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              {selected.name}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div>
                <div style={{ fontSize: "10px", color: "#85B7EB", marginBottom: "2px" }}>
                  Population
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>
                  {formatPop(selected.population)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "#85B7EB", marginBottom: "2px" }}>
                  Coordinates
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    color: "#B5D4F4",
                    lineHeight: 1.5,
                  }}
                >
                  {selected.latitude.toFixed(2)}°N
                  <br />
                  {Math.abs(selected.longitude).toFixed(2)}°{selected.longitude >= 0 ? "E" : "W"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "14px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <button
          onClick={shuffle}
          style={{
            //background: "transparent",
            border: "0.5px solid var(--color-border-secondary, #ccc)",
            borderRadius: "var(--radius-md)",
            padding: "6px 14px",
            fontSize: "13px",
            cursor: "pointer",
            color: "var(--color-text-primary, #333)",
            display: "block",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="16 3 21 3 21 8" />
            <polyline points="8 21 3 21 3 16" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          Shuffle places
        </button>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {visible.map((s) => (
            <button
              key={s.name}
              onClick={() => flyTo(s)}
              style={{
                background: selected?.name === s.name ? "#042C53" : "transparent",
                color:
                  selected?.name === s.name
                    ? "white"
                    : "var(--color-text-secondary, #666)",
                border: `0.5px solid ${
                  selected?.name === s.name
                    ? "#378ADD"
                    : "var(--color-border-tertiary, #ddd)"
                }`,
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {s.name}
            </button>
          ))}
        </div>


      </div>
    </div>
  );
}
