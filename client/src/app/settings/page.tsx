import CustomerSettings from "@/components/custom/settings/CustomerSettings";
import SellerSettings from "@/components/custom/settings/SellerSettings";

export default function Settings() {
  const userRole = "seller";

  return (
    <div>
      {userRole === "seller" ? <SellerSettings /> : <CustomerSettings />}
    </div>
  );
}
