import CustomerDashboard from "@/components/custom/dashboard/CustomerDashboard";
import SellerDashboard from "@/components/custom/dashboard/SellerDashboard";

export default function Home() {
  let userRole = "selletr";

  return (
    <div>
      {userRole === "seller" ? <SellerDashboard /> : <CustomerDashboard />}
    </div>
  );
}
