"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlert } from "lucide-react";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function CountCard({
  text,
  count,
  description,
}: {
  text: string;
  count: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-xl">{text}</CardDescription>
        <CardTitle className="text-2xl">{count}</CardTitle>
      </CardHeader>

      <CardContent className="-mt-4">
        <p className="text-green-400">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatusCard({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full inline-block ${color}`} />
          <span className="font-medium text-base">{label}</span>
        </div>
        <CardTitle className="text-2xl mt-2">{count}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default function SellerDashboard() {
  const { user } = useContext(AuthContext)!;

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="">
          You've made <span className="font-bold">$2,450</span> today.
        </p>
      </div>

      {/* order count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        <CountCard
          text="Sales Today"
          count={"$2,80"}
          description="+15% from last period"
        />
        <CountCard
          text="Sales This Week"
          count={"$20,80"}
          description="+15% from last period"
        />
        <CountCard
          text="Sales This Month"
          count={"$222,80"}
          description="+15% from last period"
        />
      </div>

      {/* order status cards */}
      <div className="p-3 bg-white rounded-xl border mt-8">
        <h1 className="text-xl font-bold">Orders Status</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <StatusCard label="Pending" count={12} color="bg-orange-400" />
          <StatusCard label="Shipped" count={24} color="bg-blue-500" />
          <StatusCard label="Delivered" count={156} color="bg-green-500" />
          <StatusCard label="Cancelled" count={3} color="bg-red-400" />
        </div>
      </div>

      {/* revenue graph */}
      <div className="p-3 bg-white rounded-xl border mt-8">
        <h1 className="text-xl font-bold">Revenue Trend (30 days)</h1>

        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* notification */}
      <div className="bg-orange-100 text-yellow-600 border flex items-center justify-between p-4 rounded-lg mt-8">
        <div className="flex items-center gap-2">
          <CircleAlert />
          <p>You have 2 products running low. Restock now. </p>
        </div>

        <Button variant={"secondary"}>View Products</Button>
      </div>
    </div>
  );
}
