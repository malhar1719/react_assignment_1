import { createContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [storedUser, setStoredUser] = useLocalStorage('tm_user', null);
  const [user, setUser] = useState(storedUser);

  const login = (name) => {
    const cleanName = name?.trim();
    if (!cleanName) return false;

    const nextUser = { id: Date.now(), name: cleanName };
    setUser(nextUser);
    setStoredUser(nextUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
