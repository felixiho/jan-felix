import React, { useEffect } from 'react';
import { LoginType } from './types';

const noop = (a?: any) => {};
export function LoginComponent({
  onSubmit,
  loading,
  email,
  onChangeEmail,
  password,
  onChangePassword,
}: {
  onSubmit: (a: LoginType) => void;
  loading: boolean;
  email: string;
  onChangeEmail: (email: string) => void;
  password: string;
  onChangePassword: (password: string) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        margin: '3rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', width: '14rem', flexDirection: 'column' }}>
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={e => onChangeEmail(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '2rem',
          width: '14rem',
          flexDirection: 'column',
        }}
      >
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={e => onChangePassword(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '2rem',
          width: '14rem',
          flexDirection: 'column',
        }}
      >
        <button
          type="button"
          style={{ backgroundColor: 'ButtonShadow', padding: '1rem' }}
          onClick={() => onSubmit({ email, password })}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
