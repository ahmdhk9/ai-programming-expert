import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function HiddenWallets() {
  return (
    <SmoothLayout title="🔒 محافظ مخفية" subtitle="نظام توزيع ذاتي مستقل">
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>🔐 النظام المستقل المخفي</h2>
        <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>100 محفظة مستقلة مع توزيع ذاتي ذكي</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
          <div><div style={{ fontSize: "0.85rem", opacity: 0.9 }}>محافظ</div><div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>100</div></div>
          <div><div style={{ fontSize: "0.85rem", opacity: 0.9 }}>مصادر</div><div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>50</div></div>
          <div><div style={{ fontSize: "0.85rem", opacity: 0.9 }}>حماية</div><div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>🔒</div></div>
          <div><div style={{ fontSize: "0.85rem", opacity: 0.9 }}>توزيع</div><div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>🤖</div></div>
        </div>
      </div>
    </SmoothLayout>
  );
}
