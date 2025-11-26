import React, { useState } from "react";

export default function Withdraw() {
  const [step, setStep] = useState(1);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "2rem" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
          <h1 style={{ margin: "0 0 2rem 0", color: "#667eea" }}>💰 السحب</h1>
          
          {step === 1 && (
            <div>
              <input type="number" placeholder="المبلغ" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", border: "1px solid #ddd", borderRadius: "6px", boxSizing: "border-box" }} />
              <select style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", border: "1px solid #ddd", borderRadius: "6px", boxSizing: "border-box" }}>
                <option>عملات رقمية</option>
                <option>تحويل بنكي</option>
                <option>بطاقة ائتمان</option>
              </select>
              <button onClick={() => setStep(2)} style={{ width: "100%", padding: "0.75rem", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                متابعة
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ background: "#f0f4ff", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                ✅ رمز التحقق أرسل إلى بريدك
              </div>
              <input type="text" placeholder="أدخل الرمز من البريد" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", border: "1px solid #ddd", borderRadius: "6px", boxSizing: "border-box" }} />
              <button onClick={() => setStep(3)} style={{ width: "100%", padding: "0.75rem", background: "#4CAF50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                تأكيد ✓
              </button>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
              <h2 style={{ color: "#4CAF50" }}>تم بنجاح!</h2>
              <p>المبلغ سيصل في 24-48 ساعة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
