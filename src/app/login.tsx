import React from 'react';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Login({ isOpen, onClose, onSubmit }: LoginProps) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px', textAlign: 'center' }}>
        <h2>Create Your Account</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <button type="submit" style={{ padding: '8px 16px', marginTop: '8px' }}>Submit</button>
        </form>
        <button onClick={onClose} style={{ marginTop: '12px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}
