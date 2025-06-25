"use client";
import { createContext, useState, useEffect } from "react";

//  Define a User type
export type UserType = {
  id?: string;
  name?: string;
  email?: string;
  userRole?: string;
};

//  Define the context type
type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
};

//. Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<UserType | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  // set user on state and localStorage
  const setUser = (user: UserType | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  // logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
