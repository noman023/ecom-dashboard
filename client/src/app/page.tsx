"use client";
import CustomerDashboard from "@/components/custom/dashboard/CustomerDashboard";

import SellerDashboard from "@/components/custom/dashboard/SellerDashboard";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const auth = useContext(AuthContext);
  console.log("Auth Context:", auth);
  let userRole = "selletr";

  return (
    <div>
      {userRole === "seller" ? <SellerDashboard /> : <CustomerDashboard />}
    </div>
  );
}
