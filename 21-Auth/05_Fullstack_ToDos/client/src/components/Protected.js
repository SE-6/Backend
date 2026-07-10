'use client';

// Wrap any page that only logged-in users should see.
// While we're still checking (/auth/me), show a tiny placeholder;
// if there's no user, bounce to /login.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Protected({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading) return <p className="muted">Loading…</p>;
  if (!user) return null;

  return children;
}
