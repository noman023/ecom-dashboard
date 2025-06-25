"use client";
import CustomerDashboard from "@/components/custom/dashboard/CustomerDashboard";

import SellerDashboard from "@/components/custom/dashboard/SellerDashboard";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const authState = useContext(AuthContext);
  const { userRole } = authState?.user || {};

  return (
    <div>
      {userRole === "seller" ? <SellerDashboard /> : <CustomerDashboard />}
    </div>
  );
}
