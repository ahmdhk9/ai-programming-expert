import React, { useState } from "react";

export default function WalletsPage() {
  const [wallets, setWallets] = useState([]);
  const [newWallet, setNewWallet] = useState({ address: '', type: 'eth', name: '' });
  const [loading, setLoading] = useState(false);

  const handleAddWallet = async () => {
    if (!newWallet.address || !newWallet.type) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/wallets/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'ahmdalbsrawe@gmail.com',
          ...newWallet
        })
      });
      const result = await response.json();
      if (result.success) {
        setWallets([...wallets, result.wallet]);
        setNewWallet({ address: '', type: 'eth', name: '' });
        alert('تمت إضافة المحفظة بنجاح!');
      } else {
        alert('خطأ: ' + result.error);
      }
    } catch (error) {
      alert('خطأ في الاتصال');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      <h1>💳 إدارة المحافظ الإلكترونية</h1>

      {/* إضافة محفظة جديدة */}
      <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2>➕ إضافة محفظة جديدة</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="اسم المحفظة"
            value={newWallet.name}
            onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />
          
          <select
            value={newWallet.type}
            onChange={(e) => setNewWallet({ ...newWallet, type: e.target.value })}
            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            <option value="eth">Ethereum (ETH)</option>
            <option value="btc">Bitcoin (BTC)</option>
            <option value="solana">Solana (SOL)</option>
            <option value="bnb">Binance (BNB)</option>
            <option value="polygon">Polygon (MATIC)</option>
          </select>

          <input
            type="text"
            placeholder="عنوان المحفظة (Address)"
            value={newWallet.address}
            onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd", fontFamily: "monospace" }}
          />

          <button
            onClick={handleAddWallet}
            disabled={loading}
            style={{
              padding: "0.8rem",
              background: loading ? "#ccc" : "#667eea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "1rem"
            }}
          >
            {loading ? "جاري الإضافة..." : "✅ إضافة المحفظة"}
          </button>
        </div>
      </div>

      {/* قائمة المحافظ */}
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "12px" }}>
        <h2 style={{ padding: "1rem", borderBottom: "1px solid #ddd", margin: 0 }}>
          محافظك الإلكترونية ({wallets.length})
        </h2>
        
        {wallets.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
            لم تضف محافظ بعد. أضف محفظة أعلاه لبدء استقبال الأرباح!
          </div>
        ) : (
          wallets.map((wallet) => (
            <div key={wallet.id} style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {wallet.name || `محفظة ${wallet.type.toUpperCase()}`}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666", fontFamily: "monospace" }}>
                    {wallet.address}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.9rem", color: "#28a745" }}>
                    ✅ {wallet.status}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    استقبل: ${wallet.totalReceived.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* معلومات مهمة */}
      <div style={{ background: "#e8f4f8", padding: "1.5rem", borderRadius: "12px", marginTop: "2rem" }}>
        <h3>ℹ️ معلومات مهمة:</h3>
        <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
          <li>جميع الأرباح ستُنقل تلقائياً إلى محافظك</li>
          <li>يمكنك إضافة أكثر من محفظة</li>
          <li>تأكد من صحة عنوان المحفظة قبل الإضافة</li>
          <li>التحويلات آمنة 100% و مشفرة</li>
          <li>لا توجد رسوم إضافية للتحويل</li>
        </ul>
      </div>
    </div>
  );
}
