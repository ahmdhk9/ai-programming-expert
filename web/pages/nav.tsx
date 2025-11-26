import Link from "next/link";

export default function Navigation() {
  const links = [
    { href: "/", emoji: "🏠", label: "Home" },
    { href: "/chat", emoji: "💬", label: "Chat AI" },
    { href: "/universal", emoji: "✨", label: "Universal" },
    { href: "/video-creator", emoji: "🎬", label: "Videos" },
    { href: "/content-manager", emoji: "📺", label: "Content" },
    { href: "/storage-advisor", emoji: "💾", label: "Storage" },
    { href: "/self-healing", emoji: "🔄", label: "Healing" },
    { href: "/resources", emoji: "📊", label: "Resources" },
  ];

  return (
    <nav style={{
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      padding: "1rem",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "2rem",
    }}>
      {links.map((link) => (
        <Link key={link.href} href={link.href} style={{
          padding: "0.5rem 1rem",
          backgroundColor: "white",
          borderRadius: "4px",
          textDecoration: "none",
          color: "#667eea",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          border: "1px solid #ddd",
        }}>
          <span>{link.emoji}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
