import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Component to auto-fit the map to the markers
function FitBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = locations.map((loc) => [loc.latitude, loc.longitude]);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [locations, map]);

  return null;
}

export default function CoverageWithSearch() {
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);

  useEffect(() => {
    fetch("/coverageArea.json")
      .then((res) => res.json())
      .then((data) => setLocations(data || []))
      .catch((err) => console.error("Failed to load coverageArea.json", err));
  }, []);

  // Prepare searchable text
  const indexed = locations.map((loc) => ({
    ...loc,
    _searchText: [
      loc.city,
      loc.district,
      loc.region,
      (loc.covered_area || []).join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  }));

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const results = indexed
      .map((loc, i) => ({ loc, i }))
      .filter(({ loc }) => loc._searchText.includes(q))
      .slice(0, 8);

    setSuggestions(results);
    setActiveIndex(0);
  }, [query, locations]);

  // Smooth fly-to function
  function focusMapToLocation(loc, zoom = 12) {
    if (!mapRef.current) return;
    const latlng = [loc.latitude, loc.longitude];

    try {
      mapRef.current.flyTo(latlng, zoom, { duration: 0.7 });
    } catch (e) {
      mapRef.current.setView(latlng, zoom);
    }
  }

  function handleSelectSuggestion({ loc, i }) {
    setFiltered(loc);
    focusMapToLocation(loc);

    const originalIndex = locations.findIndex(
      (L) =>
        L.city === loc.city &&
        L.latitude === loc.latitude &&
        L.longitude === loc.longitude
    );

    const m = markerRefs.current[originalIndex];
    if (m && typeof m.openPopup === "function") m.openPopup();

    setQuery(loc.city + (loc.district ? `, ${loc.district}` : ""));
    setSuggestions([]);
    setActiveIndex(-1);
  }

  function clearSearch() {
    setQuery("");
    setSuggestions([]);
    setFiltered(null);
    setActiveIndex(-1);

    if (mapRef.current && locations.length > 0) {
      const bounds = locations.map((loc) => [loc.latitude, loc.longitude]);
      mapRef.current.fitBounds(bounds, { padding: [60, 60] });
    }
  }

  // ⭐ UPDATED WITH FLYING EFFECT WHEN PRESS ENTER ⭐
  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((s) => Math.min(s + 1, suggestions.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((s) => Math.max(s - 1, 0));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      // 1️⃣ If suggestion is selected
      if (suggestions[activeIndex]) {
        handleSelectSuggestion(suggestions[activeIndex]);
        return;
      }

      // 2️⃣ Direct search match
      const q = query.trim().toLowerCase();
      const directMatch = indexed.find((item) =>
        item._searchText.includes(q)
      );

      if (directMatch) {
        handleSelectSuggestion({ loc: directMatch, i: 0 });
        return;
      }
    }

    if (e.key === "Escape") {
      clearSearch();
    }
  }

  return (
    <div className="w-full h-full mx-auto p-6 flex justify-center bg-gray-50">
      <div className="w-full max-w-6xl">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Our Coverage in Bangladesh</h2>
          <div className="text-sm text-gray-600">
            Showing {filtered ? "1 location" : `${locations.length} locations`}
          </div>
        </header>

        <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 lg:col-span-2">
            {/* Search Box */}
            <div className="relative">
              <div className="flex items-center border rounded-lg shadow-sm overflow-hidden bg-white">
                <div className="px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  className="w-full px-3 py-3 text-sm focus:outline-none"
                  placeholder="Search by city, district, region or covered area"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  aria-label="Search coverage"
                />

                <div className="pr-3">
                  {query ? (
                    <button
                      onClick={clearSearch}
                      className="text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                      Clear
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400"></span>
                  )}
                </div>
              </div>

              {/* Suggestion Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute z-50 left-0 right-0 bg-white border rounded-b-lg shadow-lg mt-1 max-h-64 overflow-auto">
                  {suggestions.map((s, idx) => (
                    <li
                      key={`${s.i}-${s.loc.city}`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => handleSelectSuggestion(s)}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                        activeIndex === idx ? "bg-gray-100" : ""
                      }`}
                      role="option"
                    >
                      <div>
                        <div className="font-semibold">{s.loc.city}</div>
                        <div className="text-sm text-gray-600">
                          {s.loc.district} — {s.loc.region}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{s.loc.status}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Map */}
            <div className="mt-4 rounded-lg overflow-hidden border">
              <MapContainer
                center={[23.8103, 90.4125]}
                zoom={7}
                style={{ height: "520px", width: "100%" }}
                whenCreated={(map) => (mapRef.current = map)}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <FitBounds locations={filtered ? [filtered] : locations} />

                {(filtered ? [filtered] : locations).map((loc, i) => {
                  const originalIndex = locations.findIndex(
                    (L) =>
                      L.city === loc.city &&
                      L.latitude === loc.latitude &&
                      L.longitude === loc.longitude
                  );

                  return (
                    <Marker
                      key={`${loc.city}-${i}`}
                      position={[loc.latitude, loc.longitude]}
                      ref={(el) => {
                        if (originalIndex >= 0)
                          markerRefs.current[originalIndex] = el;
                      }}
                      eventHandlers={{
                        click: () => {
                          focusMapToLocation(loc, 12);
                        },
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <div className="font-bold">{loc.city}</div>
                          <div className="text-gray-700 text-xs mt-1">
                            District: {loc.district}
                          </div>
                          <div className="text-gray-700 text-xs">
                            Region: {loc.region}
                          </div>
                          <div className="text-gray-700 text-xs">
                            Status: {loc.status}
                          </div>
                          <div className="text-gray-700 text-xs mt-2">
                            Covered Area:{" "}
                            {loc.covered_area
                              ? loc.covered_area.join(", ")
                              : "-"}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>

          {/* Side Info Panel */}
          <aside className="col-span-1 bg-white rounded-lg shadow-sm p-4">
            {filtered ? (
              <div>
                <h3 className="font-bold text-lg mb-2">{filtered.city}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  {filtered.district} — {filtered.region}
                </div>

                <div className="text-sm mb-2">
                  <strong>Status:</strong> {filtered.status}
                </div>

                <div className="text-sm">
                  <strong>Covered Areas:</strong>
                </div>

                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {(filtered.covered_area || []).map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      focusMapToLocation(filtered, 13)
                    }
                    className="px-3 py-2 rounded bg-indigo-600 text-white text-sm"
                  >
                    Zoom to
                  </button>

                  <button
                    onClick={clearSearch}
                    className="px-3 py-2 rounded border text-sm"
                  >
                    Show all
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-gray-800">
                  Coverage summary
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Search for a city, district or area to focus the map.
                  Click markers to view details.
                </p>

                <div className="mt-4">
                  <div className="text-sm text-gray-700">
                    <strong>Total locations:</strong> {locations.length}
                  </div>

                  <div className="text-sm text-gray-700 mt-2">
                    <strong>Tip:</strong> Use arrow keys to navigate
                    suggestions and Enter to select.
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
