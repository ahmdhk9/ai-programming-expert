import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hello, Agent 👋</h1>
      <p>Welcome to the AI Programming Expert project.</p>
      <nav style={{ marginTop: "1rem" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}
