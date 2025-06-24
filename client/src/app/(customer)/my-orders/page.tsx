"use client";
import DataTable from "@/components/custom/global/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Truck,
  X,
  Repeat,
  MoreVertical,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

const allData = [
  {
    id: "ORD-12345",
    date: "2023-05-20",
    status: "Delivered",
    amount: "249.99",
  },
  {
    id: "ORD-12346",
    date: "2023-05-15",
    status: "Shipped",
    amount: "399.99",
  },
  {
    id: "ORD-12347",
    date: "2023-05-10",
    status: "Processing",
    amount: "159.98",
  },
  {
    id: "ORD-12348",
    date: "2023-05-05",
    status: "Delivered",
    amount: "79.99",
  },
  {
    id: "ORD-12349",
    date: "2023-04-30",
    status: "Cancelled",
    amount: "129.99",
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-orange-100 text-orange-700",
  Cancelled: "bg-red-100 text-red-600",
};

const columns = [
  columnHelper.accessor("id", {
    header: "Order ID",
    cell: (info) => <span className="font-medium">#{info.getValue()}</span>,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusStyles[info.getValue()] || "bg-gray-100 text-gray-700"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Total",
    cell: (info) => (
      <span className="font-medium">
        ${parseFloat(info.getValue()).toFixed(2)}
      </span>
    ),
    meta: { align: "right" },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <div className="flex gap-2">
          {status === "Delivered" && (
            <Button size="sm" variant="outline" className="px-3">
              <Repeat className="w-4 h-4 mr-1" /> Buy Again
            </Button>
          )}
          {status === "Shipped" && (
            <Button size="sm" variant="outline" className="px-3">
              <PackageSearch className="w-4 h-4 mr-1" /> Track
            </Button>
          )}
          {status === "Processing" && (
            <Button size="sm" variant="outline" className="px-3">
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
          )}
          {status === "Cancelled" && (
            <Button size="sm" variant="outline" className="px-3">
              <ShoppingBag className="w-4 h-4 mr-1" /> Reorder
            </Button>
          )}
          <Button size="icon" variant="ghost">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  }),
];

export default function MyOrders() {
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [orderStatus, setOrderStatus] = useState("");

  // Filter by search, status tab, and dropdown
  const filteredData = allData.filter((item) => {
    const matchesSearch = item.id.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      statusTab === "all" ? true : item.status.toLowerCase() === statusTab;
    const matchesDropdown =
      !orderStatus || item.status.toLowerCase() === orderStatus;
    return matchesSearch && matchesTab && matchesDropdown;
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-gray-500">View and manage your order history.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 my-4 items-center">
        <Input
          placeholder="Search by order id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white"
        />

        <div className="bg-white ">
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable data={filteredData} columns={columns} />
    </div>
  );
}
