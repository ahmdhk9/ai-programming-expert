import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Settings() {
  const router = useRouter();
  const [settings, setSettings] = useState({ notifications: true, theme: 'dark' });

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }}>
      <h1>⚙️ الإعدادات</h1>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
        <label style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
          <input type='checkbox' checked={settings.notifications} onChange={(e) => setSettings({...settings, notifications: e.target.checked})} />
          🔔 الإشعارات
        </label>
        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          💾 حفظ الإعدادات
        </button>
      </div>
    </div>
  );
}
