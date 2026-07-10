'use client';

// A tiny Context that holds "who is logged in" on the client side.
// Auth (login / register / logout / me) talks to the backend DIRECTLY with
// credentials:'include', so the browser stores and reads the httpOnly cookies.
//
// 💡 credentials:'include' is the important bit, without it the browser wont
//    send our cookies to the API, and it wont save the cookie the API sends back.

import { createContext, useContext, useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, ask the backend "who am I?" using the cookie.
  useEffect(() => {
    (async () => {
      // TODO 1: fetch GET `${API_URL}/auth/me` with credentials:'include'
      //   - if the response is ok  -> setUser(await res.json())
      //   - if it fails / throws   -> just leave the user as null (not logged in)
      //   - either way, at the end -> setLoading(false)
    })();
  }, []);

  async function login(email, password) {
    // TODO 2: POST `${API_URL}/auth/login`
    //   - headers: { 'Content-Type': 'application/json' }
    //   - credentials: 'include'
    //   - body: JSON.stringify({ email, password })
    //   - read the json. if !res.ok -> throw new Error(data.message)
    //   - on success -> setUser(data.user) and return it
  }

  async function register(payload) {
    // TODO 3: same idea as login, but POST to `${API_URL}/auth/register`.
    //   `payload` is already { firstName, lastName, email, password }.
    //   -> setUser(data.user) on success
  }

  async function logout() {
    // TODO 4: DELETE `${API_URL}/auth/logout` with credentials:'include',
    //   then setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
