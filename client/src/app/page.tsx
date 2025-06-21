import CustomerDashboard from "@/components/custom/dashboard/CustomerDashboard";
import SellerDashboard from "@/components/custom/dashboard/SellerDashboard";

export default function Home() {
  const userRole = "seller";

  return (
    <div>
      {userRole === "seller" ? <SellerDashboard /> : <CustomerDashboard />}
    </div>
  );
}
