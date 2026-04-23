import { useState } from "react";

const mockData = {
  Mumbai: {
    name: "Mumbai", country: "IN", temp: 32, feels_like: 36,
    humidity: 78, wind: 18, pressure: 1008, visibility: 6,
    clouds: 40, desc: "Partly Cloudy", main: "Clouds",
    forecast: [
      { day: "Thu", temp: 32, main: "Clouds" },
      { day: "Fri", temp: 30, main: "Rain" },
      { day: "Sat", temp: 28, main: "Thunderstorm" },
      { day: "Sun", temp: 31, main: "Clouds" },
      { day: "Mon", temp: 33, main: "Clear" },
    ],
  },
  Pune: {
    name: "Pune", country: "IN", temp: 27, feels_like: 29,
    humidity: 60, wind: 12, pressure: 1012, visibility: 9,
    clouds: 20, desc: "Mostly Sunny", main: "Clear",
    forecast: [
      { day: "Thu", temp: 27, main: "Clear" },
      { day: "Fri", temp: 25, main: "Clouds" },
      { day: "Sat", temp: 24, main: "Rain" },
      { day: "Sun", temp: 26, main: "Clear" },
      { day: "Mon", temp: 28, main: "Clear" },
    ],
  },
  Delhi: {
    name: "Delhi", country: "IN", temp: 38, feels_like: 42,
    humidity: 35, wind: 10, pressure: 1005, visibility: 7,
    clouds: 10, desc: "Hot and Sunny", main: "Clear",
    forecast: [
      { day: "Thu", temp: 38, main: "Clear" },
      { day: "Fri", temp: 39, main: "Clear" },
      { day: "Sat", temp: 37, main: "Clouds" },
      { day: "Sun", temp: 36, main: "Clouds" },
      { day: "Mon", temp: 40, main: "Clear" },
    ],
  },
  Igatpuri: {
    name: "Igatpuri", country: "IN", temp: 28, feels_like: 30,
    humidity: 72, wind: 14, pressure: 1010, visibility: 8,
    clouds: 55, desc: "Partly Cloudy", main: "Clouds",
    forecast: [
      { day: "Thu", temp: 28, main: "Clouds" },
      { day: "Fri", temp: 25, main: "Rain" },
      { day: "Sat", temp: 22, main: "Thunderstorm" },
      { day: "Sun", temp: 27, main: "Clouds" },
      { day: "Mon", temp: 31, main: "Clear" },
    ],
  },
  Nashik: {
    name: "Nashik", country: "IN", temp: 30, feels_like: 32,
    humidity: 55, wind: 16, pressure: 1011, visibility: 10,
    clouds: 30, desc: "Sunny", main: "Clear",
    forecast: [
      { day: "Thu", temp: 30, main: "Clear" },
      { day: "Fri", temp: 28, main: "Clouds" },
      { day: "Sat", temp: 26, main: "Rain" },
      { day: "Sun", temp: 29, main: "Clear" },
      { day: "Mon", temp: 31, main: "Clear" },
    ],
  },
  Bangalore: {
    name: "Bangalore", country: "IN", temp: 24, feels_like: 25,
    humidity: 65, wind: 11, pressure: 1015, visibility: 10,
    clouds: 25, desc: "Pleasant", main: "Clouds",
    forecast: [
      { day: "Thu", temp: 24, main: "Clouds" },
      { day: "Fri", temp: 23, main: "Rain" },
      { day: "Sat", temp: 22, main: "Rain" },
      { day: "Sun", temp: 24, main: "Clouds" },
      { day: "Mon", temp: 25, main: "Clear" },
    ],
  },
};

const weatherIcons = {
  Clear: "☀️", Clouds: "⛅", Rain: "🌧️",
  Drizzle: "🌦️", Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️",
};

const bgGradients = {
  Clear: "linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)",
  Clouds: "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
  Rain: "linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)",
  Thunderstorm: "linear-gradient(135deg, #ede7f6 0%, #9575cd 100%)",
  Snow: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
  Mist: "linear-gradient(135deg, #f5f5f5 0%, #ddd 100%)",
};

export default function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const key = Object.keys(mockData).find(
      (k) => k.toLowerCase() === input.trim().toLowerCase()
    );
    if (key) {
      setWeather(mockData[key]);
      setError("");
    } else {
      setError(`"${input}" not found. Try: Mumbai, Pune, Delhi, Igatpuri, Nashik, Bangalore`);
      setWeather(null);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSearch(); };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const bg = weather ? (bgGradients[weather.main] || bgGradients.Clouds) : "#f0f4f8";

  return (
    <div style={{ minHeight: "100vh", background: bg, transition: "background 0.5s", padding: "2rem 1rem", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 36, background: "rgba(255,255,255,0.7)", borderRadius: 14, padding: "6px 12px", backdropFilter: "blur(4px)" }}>☁️</div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#1a237e" }}>SkyCheck</h1>
            <p style={{ fontSize: 13, margin: 0, color: "#5c6bc0" }}>Weather Dashboard · Deployed on AWS Amplify</p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
          <input
            style={{ flex: 1, padding: "12px 16px", borderRadius: 12, border: "none", fontSize: 15, boxShadow: "0 2px 12px rgba(0,0,0,0.1)", outline: "none" }}
            type="text"
            placeholder="Search city... e.g. Mumbai, Pune, Delhi"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            style={{ padding: "12px 24px", background: "#1a237e", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, cursor: "pointer", fontWeight: 600, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Quick Buttons */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.2rem" }}>
          {Object.keys(mockData).map((city) => (
            <button
              key={city}
              onClick={() => { setInput(city); setWeather(mockData[city]); setError(""); }}
              style={{ padding: "6px 16px", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 20, fontSize: 13, cursor: "pointer", fontWeight: 500, color: "#1a237e" }}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "#ffebee", border: "1px solid #ffcdd2", borderRadius: 12, padding: "12px 16px", color: "#c62828", marginBottom: "1rem", fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        {/* No city selected yet */}
        {!weather && !error && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#5c6bc0" }}>
            <div style={{ fontSize: 64, marginBottom: "1rem" }}>🌍</div>
            <p style={{ fontSize: 18, fontWeight: 500 }}>Search a city to see the weather</p>
            <p style={{ fontSize: 14, opacity: 0.7 }}>Try Mumbai, Pune, Delhi, Igatpuri...</p>
          </div>
        )}

        {/* Main Weather Card */}
        {weather && (
          <>
            <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "1.8rem", marginBottom: "1rem", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", backdropFilter: "blur(8px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#1a237e" }}>
                    {weather.name}, {weather.country}
                  </h2>
                  <p style={{ fontSize: 13, color: "#7986cb", margin: "4px 0 0" }}>{today}</p>
                </div>
                <span style={{ fontSize: 64 }}>{weatherIcons[weather.main] || "🌡️"}</span>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "1rem 0 0" }}>
                <span style={{ fontSize: 72, fontWeight: 700, color: "#1a237e", lineHeight: 1 }}>{weather.temp}</span>
                <span style={{ fontSize: 28, color: "#7986cb" }}>°C</span>
              </div>
              <p style={{ fontSize: 18, color: "#5c6bc0", margin: "4px 0 1.2rem", textTransform: "capitalize" }}>{weather.desc}</p>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { label: "Feels Like", val: `${weather.feels_like}°C`, icon: "🌡️" },
                  { label: "Humidity", val: `${weather.humidity}%`, icon: "💧" },
                  { label: "Wind Speed", val: `${weather.wind} km/h`, icon: "💨" },
                  { label: "Pressure", val: `${weather.pressure} hPa`, icon: "📊" },
                  { label: "Visibility", val: `${weather.visibility} km`, icon: "👁️" },
                  { label: "Cloudiness", val: `${weather.clouds}%`, icon: "☁️" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.8)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.9)" }}>
                    <p style={{ fontSize: 11, color: "#9fa8da", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 4px" }}>
                      {s.icon} {s.label}
                    </p>
                    <p style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "#1a237e" }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Day Forecast */}
            <p style={{ fontSize: 13, fontWeight: 600, color: "#5c6bc0", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px" }}>5-Day Forecast</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: "2rem" }}>
              {weather.forecast.map((day) => (
                <div key={day.day} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 14, padding: "14px 8px", textAlign: "center", backdropFilter: "blur(4px)" }}>
                  <p style={{ fontSize: 13, color: "#7986cb", margin: "0 0 6px", fontWeight: 600 }}>{day.day}</p>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 6 }}>{weatherIcons[day.main] || "🌡️"}</span>
                  <p style={{ fontSize: 16, fontWeight: 700, margin: "0 0 2px", color: "#1a237e" }}>{day.temp}°</p>
                  <p style={{ fontSize: 11, color: "#9fa8da", margin: 0 }}>{day.main}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "rgba(92,107,192,0.6)", marginTop: "1rem" }}>
          ☁️ SkyCheck · Third Year Cloud Computing Practical · AWS Amplify PaaS Deployment
        </p>
      </div>
    </div>
  );
}