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
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { commonButtonStyle } from "@/utils/commonButtonStyle";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("image", {
    header: "Image",
    cell: () => <div className="w-8 h-8 bg-gray-200 rounded" />,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.accessor("sku", {
    header: "SKU",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="px-2 py-1 h-8">
          <Edit className="w-4 h-4 mr-1" /> Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 h-8 border-red-200 text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </div>
    ),
  }),
];

const allData = [
  {
    image: null,
    name: "Premium Cotton T-Shirt",
    sku: "TS-001",
    price: "$100",
    stock: 200,
    status: "Active",
    category: "apparel",
  },
  {
    image: null,
    name: "Leather Wallet",
    sku: "WL-002",
    price: "$50",
    stock: 200,
    status: "Active",
    category: "accessories",
  },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [category, setCategory] = useState("");

  // Example filter logic
  const filteredData = allData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());

    const matchesStock =
      stockStatus === "" ||
      (stockStatus === "active" && item.status === "Active") ||
      (stockStatus === "low" && item.status === "Low Stock") ||
      (stockStatus === "out" && item.status === "Out of Stock");

    const matchesCategory = category === "" || item.category === category;
    // Add category filter logic if you have categories
    return matchesSearch && matchesStock && matchesCategory;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button className={commonButtonStyle}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Custom search and filter controls */}
      <div className="flex items-center justify-between gap-4 my-6">
        <Input
          placeholder="Search by name or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-white"
        />

        <div className="flex gap-2">
          <div className="bg-white ">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-36 ">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                {/* ... */}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white ">
            <Select value={stockStatus} onValueChange={setStockStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <DataTable data={filteredData} columns={columns} />
    </div>
  );
}
