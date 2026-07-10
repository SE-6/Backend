'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setPending(true);

    const form = new FormData(e.currentTarget);
    try {
      await register({
        firstName: form.get('firstName'),
        lastName: form.get('lastName'),
        email: form.get('email'),
        password: form.get('password'),
      });
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="narrow">
      <h1>Create an account</h1>
      <form onSubmit={onSubmit} className="form">
        {error && <p className="error">{error}</p>}

        <label>
          First name
          <input name="firstName" type="text" required />
        </label>

        <label>
          Last name
          <input name="lastName" type="text" required />
        </label>

        <label>
          Email
          <input name="email" type="email" required />
        </label>

        <label>
          Password
          <input name="password" type="password" minLength={6} required />
        </label>

        <button className="btn" type="submit" disabled={pending}>
          {pending ? 'Creating…' : 'Sign up'}
        </button>
      </form>

      <p className="muted" style={{ marginTop: 16 }}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </section>
  );
}
