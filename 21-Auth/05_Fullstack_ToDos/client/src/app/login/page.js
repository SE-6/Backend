'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setPending(true);

    const form = new FormData(e.currentTarget);
    try {
      await login(form.get('email'), form.get('password'));
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="narrow">
      <h1>Log in</h1>
      <form onSubmit={onSubmit} className="form">
        {error && <p className="error">{error}</p>}

        <label>
          Email
          <input name="email" type="email" required />
        </label>

        <label>
          Password
          <input name="password" type="password" required />
        </label>

        <button className="btn" type="submit" disabled={pending}>
          {pending ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="muted" style={{ marginTop: 16 }}>
        No account yet? <Link href="/register">Create one</Link>
      </p>
    </section>
  );
}
