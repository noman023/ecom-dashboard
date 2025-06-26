"use client";
import { AuthContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  // Allow public access to login and register
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (auth?.loading) {
    return "Loading..";
  }

  useEffect(() => {
    if (!auth?.user && !isAuthPage) {
      router.replace("/login");
    }
  }, [auth?.user, isAuthPage, router]);

  // show spinner while checking
  if (!auth?.user && !isAuthPage)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );

  return <>{children}</>;
}
