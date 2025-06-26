"use client";
import { Navbar } from "@/components/custom/layout/Navbar";
import { SidebarComponent } from "@/components/custom/layout/Sidebar";
import SearchBar from "@/components/custom/layout/SearchBar";
import { usePathname } from "next/navigation";
import AuthContextProvider from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {/* include auth page */}
        {isAuthPage ? (
          <main className="flex-1 overflow-auto p-4 bg-gray-50 min-h-screen flex items-center justify-center">
            {children}
          </main>
        ) : (
          <ProtectedRoute>
            <div className="flex min-h-screen flex-col px-1">
              <Navbar />
              <SearchBar />
              <div className="flex flex-1 border-t">
                <SidebarComponent />
                <main className="flex-1 overflow-auto p-4 bg-gray-50">
                  {children}
                </main>
              </div>
            </div>
          </ProtectedRoute>
        )}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
