import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Type definition for each trainee
type Trainee = {
  id: number;
  name: string;
  role: string;
  skills: string;
  summary: string;
  experience: string;
  education: string;
  projects: string;
  profileImageUrl: string;
};

function App() {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Trainee | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://trainee-backend-suun.onrender.com/api/trainees")
      .then((res) => setTrainees(res.data))
      .catch((err) => console.error("Failed to fetch trainees", err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = trainees.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: darkMode ? "#121212" : "#fafafa",
        color: darkMode ? "#f5f5f5" : "#0a2351",
        minHeight: "100vh",
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      {/* Jarvis Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: darkMode ? "#1a1a1a" : "#ffe5e5",
          padding: "1rem 2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
        }}
      >
        {/* Placeholder Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/jarvis.webp"
            alt="Jarvis Logo"
            style={{
              height: "40px",
              objectFit: "contain",
            }}
          />
          <h2 style={{ margin: 0, color: "white" }}></h2>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "white",
            color: "#b30000",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Trainee Profile Showcase
      </h1>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            width: "100%",
            maxWidth: "400px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filtered.map((t) => (
          <div
            key={t.id}
            tabIndex={0}
            onClick={() => setSelected(t)}
            onKeyDown={(e) => e.key === "Enter" && setSelected(t)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              padding: "1.5rem",
              backgroundColor: darkMode ? "#1e1e1e" : "#fff",
              color: darkMode ? "#eee" : "#000",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <img
              src={t.profileImageUrl || "https://via.placeholder.com/80"}
              alt={`${t.name} profile`}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1rem",
              }}
            />
            <h2>{t.name}</h2>
            <p style={{ fontWeight: "bold", margin: "0.5rem 0" }}>{t.role}</p>
            <p>
              <strong>Skills:</strong>
              <br />
              {t.skills || "---"}
            </p>
            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#b30000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              View Resume
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: darkMode ? "#1e1e1e" : "#fff",
              color: darkMode ? "#fff" : "#000",
              borderRadius: "10px",
              padding: "2rem",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h2>{selected.name}</h2>
            <p>
              <strong>Role:</strong> {selected.role}
            </p>
            <p>
              <strong>Summary:</strong> {selected.summary}
            </p>
            <p>
              <strong>Experience:</strong> {selected.experience}
            </p>
            <p>
              <strong>Education:</strong> {selected.education}
            </p>
            <p>
              <strong>Projects:</strong> {selected.projects}
            </p>

            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#b30000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                marginRight: "1rem",
              }}
              onClick={() => alert("Resume download coming soon!")}
            >
              Download Resume
            </button>

            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: "1.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: darkMode ? "#ddd" : "#b30000",
                color: darkMode ? "#000" : "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
