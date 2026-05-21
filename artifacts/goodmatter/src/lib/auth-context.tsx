import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "founder" | "investor" | null;

interface AuthContextType {
  isLoggedIn: boolean;
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  role: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);

  const login = (r: UserRole) => setRole(r);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn: role !== null, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
