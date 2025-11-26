import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function SearchEngine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const performSearch = async () => {
    setSearching(true);
    try {
      const res = await fetch("/api/web/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      setResults([]);
    }
    setSearching(false);
  };

  return (
    <SmoothLayout title="🔎 محرك البحث" subtitle="ابحث عن أي شيء على الإنترنت">
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => e.key === "Enter" && performSearch()} placeholder="ابحث..." style={{ flex: 1, padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px", direction: "rtl" }} />
          <button onClick={performSearch} disabled={searching} style={{ padding: "0.75rem 1.5rem", background: searching ? "#999" : "#667eea", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            {searching ? "⏳" : "🔎"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {results.map((r: any, i: number) => (
          <div key={i} style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#667eea" }}>{r.title}</h3>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{r.snippet}</p>
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
