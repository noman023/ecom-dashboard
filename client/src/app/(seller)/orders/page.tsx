"use client";
import DataTable from "@/components/custom/global/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye, Truck, X } from "lucide-react";
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

const allData = [
  {
    id: "Ord-01",
    date: "2025-05-15",
    buyer: "Mike Turner",
    amount: "$200",
    status: "Pending",
    product: "Wireless Earbuds X200",
  },
  {
    id: "Ord-02",
    date: "2025-05-14",
    buyer: "Will Turner",
    amount: "$100",
    status: "Shipped",
    product: "Leather Wallet",
  },
  {
    id: "Ord-03",
    date: "2025-05-13",
    buyer: "Jane Doe",
    amount: "$50",
    status: "Delivered",
    product: "Premium Cotton T-Shirt",
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
  Pending: "bg-orange-100 text-orange-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Filter by search and status tab
  const filteredData = allData.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      item.id.toLowerCase().includes(q) || item.buyer.toLowerCase().includes(q);
    const matchesStatus =
      statusTab === "all" ? true : item.status.toLowerCase() === statusTab;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    columnHelper.accessor("id", {
      header: "Order ID",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor("buyer", {
      header: "Buyer",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            statusStyles[info.getValue()] || "bg-gray-100 text-gray-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="px-2 py-1 h-8"
            onClick={() => {
              setSelectedOrder(info.row.original);
              setViewModalOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-1" /> View
          </Button>
          {info.row.original.status === "Pending" && (
            <Button size="sm" variant="destructive" className="px-2 py-1 h-8">
              <Truck className="w-4 h-4 mr-1" /> Ship
            </Button>
          )}
        </div>
      ),
    }),
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="my-4">
        <Input
          placeholder="Search by order id or customer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white"
        />
      </div>

      {/* Status Tabs */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 bg-gray-100 rounded-lg p-2 mb-6 border">
        {["all", "Pending", "Shipped", "Cancelled"].map((status) => (
          <button
            key={status}
            className={`px-6 py-2 rounded-md font-medium transition-colors cursor-pointer ${
              statusTab === status.toLowerCase() ||
              (statusTab === "all" && status === "all")
                ? "bg-white shadow text-black"
                : "bg-transparent text-gray-500"
            }`}
            onClick={() => setStatusTab(status.toLowerCase())}
            type="button"
          >
            {status === "all" ? "All" : status}
          </button>
        ))}
      </div>

      <DataTable data={filteredData} columns={columns} />

      {/* View Order Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder ? formatDate(selectedOrder.date) : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-gray-500">Status:</span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                statusStyles[selectedOrder?.status] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {selectedOrder?.status === "Pending"
                ? "Processing"
                : selectedOrder?.status}
            </span>
          </div>
          <div className="mb-2 flex">
            <span className="w-24 text-gray-500">Product:</span>
            <span className="font-medium">{selectedOrder?.product}</span>
          </div>
          <div className="mb-2 flex">
            <span className="w-24 text-gray-500">Amount:</span>
            <span>{selectedOrder?.amount}</span>
          </div>
          <div className="mb-4 flex">
            <span className="w-24 text-gray-500">Customer:</span>
            <span>{selectedOrder?.buyer}</span>
          </div>
          <DialogFooter className="flex justify-center gap-2">
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
            {selectedOrder?.status === "Pending" && (
              <Button variant="destructive">
                <Truck className="w-4 h-4 mr-1" /> Ship
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
