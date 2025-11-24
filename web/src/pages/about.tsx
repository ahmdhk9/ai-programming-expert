import React from "react";

export default function About() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>About the Agent</h1>
      <p>
        هذا المشروع يمثل وكيل برمجي ذكي ذاتي التشغيل. 
        يهدف إلى توليد الكود، نشره، مراقبته، وتصحيحه بشكل تلقائي.
      </p>
      <p>
        النسخة الحالية هي MVP منشورة على Vercel، والخطوات القادمة تشمل
        إضافة لوحة Dashboard وربط مع Firebase/GCP.
      </p>
    </div>
  );
}
