import { Card, CardHeader } from "@/components/ui/card";
import { Package, Heart, Truck, Gift, CheckCircle, Star } from "lucide-react";

function InfoCard({
  label,
  count,
  icon,
  iconBg,
}: {
  label: string;
  count: number | string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <Card>
      <div className="w-full flex items-center justify-between">
        <CardHeader className="w-full pb-2 flex flex-col items-center justify-between">
          <p className="text-sm text-gray-500">{label}</p>
          <span className="text-2xl font-bold">{count}</span>
        </CardHeader>

        <div className="w-full ">
          <span className={`inline-block rounded-full p-2 ${iconBg}`}>
            {icon}
          </span>
        </div>
      </div>
    </Card>
  );
}

const activities = [
  {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: "Order Delivered",
    description: "Your order #ORD-7895 has been delivered",
    time: "Today, 9:45 AM",
  },
  {
    icon: <Heart className="w-5 h-5 text-pink-400" />,
    title: "Added to Wishlist",
    description: "You added 'Wireless Headphones' to your wishlist",
    time: "Yesterday, 4:30 PM",
  },
  {
    icon: <Truck className="w-5 h-5 text-blue-500" />,
    title: "Order Shipped",
    description: "Your order #ORD-7891 has been shipped",
    time: "Yesterday, 11:20 AM",
  },
  {
    icon: <Star className="w-5 h-5 text-yellow-400" />,
    title: "Review Posted",
    description: "You posted a review for 'Smart Watch'",
    time: "May 20, 2023",
  },
  {
    icon: <Gift className="w-5 h-5 text-purple-500" />,
    title: "Coupon Applied",
    description: "You used coupon 'SUMMER20' on your purchase",
    time: "May 18, 2023",
  },
];

export default function CustomerDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hi, Alex 👋</h1>

      <div className="w-full flex justify-end">
        <p className="">Last Updated: Today, 10:30 AM</p>
      </div>

      {/* info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <InfoCard
          label="Total Orders"
          count={24}
          icon={<Package className="w-6 h-6 text-blue-500" />}
          iconBg="bg-blue-100"
        />
        <InfoCard
          label="Wishlist Items"
          count={12}
          icon={<Heart className="w-6 h-6 text-pink-400" />}
          iconBg="bg-pink-100"
        />
        <InfoCard
          label="Pending Deliveries"
          count={3}
          icon={<Truck className="w-6 h-6 text-orange-400" />}
          iconBg="bg-orange-100"
        />
        <InfoCard
          label="Active Coupons"
          count={5}
          icon={<Gift className="w-6 h-6 text-green-500" />}
          iconBg="bg-green-100"
        />
      </div>

      {/* recent activities */}
      <div className="bg-white rounded-xl border py-6 px-3 shadow-sm mt-10">
        <h1 className="font-semibold text-lg mb-4">Recent Activity</h1>
        <ul className="divide-y">
          {activities.map((activity, idx) => (
            <li key={idx} className="flex items-start justify-between py-4">
              <div className="flex items-start gap-3">
                <span>{activity.icon}</span>

                <div>
                  <p className={`font-medium `}>{activity.title}</p>

                  <p className="text-gray-500 text-sm">
                    {activity.description}
                  </p>
                </div>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap mt-1">
                {activity.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
