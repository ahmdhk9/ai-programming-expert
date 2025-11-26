import React from 'react';
import Link from 'next/link';

export default function AdminAccess() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#667eea' }}>🔐 Admin Panel</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>رابط الدخول للمطور أحمد البصراوي</p>
        <Link href='/admin' style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          ⚙️ دخول لوحة التحكم
        </Link>
      </div>
    </div>
  );
}
