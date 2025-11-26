import React, { useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState({ bio: '', avatar: '' });

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }}>
      <h1>👤 ملفي الشخصي</h1>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
        <textarea placeholder='نبذة عني' style={{ width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd' }} />
        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ✅ تحديث الملف الشخصي
        </button>
      </div>
    </div>
  );
}
