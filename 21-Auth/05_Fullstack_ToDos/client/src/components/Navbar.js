'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <header className='nav'>
      <div className='nav-inner container'>
        <Link href='/' className='brand'>
          SE006 BLOG API
        </Link>

        <nav className='nav-links'>
          <Link href='/'>Home</Link>

          {user && <Link href='/create'>Write</Link>}

          {!loading && !user && (
            <>
              <Link href='/login'>Log in</Link>
              <Link href='/register' className='btn btn--sm'>
                Sign up
              </Link>
            </>
          )}

          {user && (
            <span className='nav-user'>
              <span className='muted'>Hi, {user.firstName}</span>
              <button className='btn btn--sm btn--ghost' onClick={logout}>
                Log out
              </button>
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
