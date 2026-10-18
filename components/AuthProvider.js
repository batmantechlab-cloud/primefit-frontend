'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { API_ROUTES, apiRequest } from '../lib/api';

const AuthContext = createContext({ user: null, ready: false, setUser: () => {}, refresh: async () => {}, logout: async () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const result = await apiRequest(API_ROUTES.me);
      setUser(result.user);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  const logout = useCallback(async () => {
    try { await apiRequest(API_ROUTES.logout, { method: 'POST' }); } catch { /* Cookie may already be gone. */ }
    setUser(null);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return <AuthContext.Provider value={{ user, ready, setUser, refresh, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
