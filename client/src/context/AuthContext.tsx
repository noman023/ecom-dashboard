"use client";
import { createContext, useState, Dispatch, SetStateAction } from "react";

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
  setUser: Dispatch<SetStateAction<UserType | null>>;
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
  const [user, setUser] = useState<UserType | null>(null);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
