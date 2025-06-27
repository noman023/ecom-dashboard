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
import { AlertTriangle, Edit, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createColumnHelper } from "@tanstack/react-table";
import { commonButtonStyle } from "@/utils/commonButtonStyle";
import Link from "next/link";
import useTanstackQuery, { axiosInstance } from "@/hooks/useAxiosInstance";
import { baseURL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper<any>();

export default function Products() {
  const [search, setSearch] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [category, setCategory] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data, isLoading, isError, error, refetch } =
    useTanstackQuery("/products");

  // Handle loading and error states
  if (isLoading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }
  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading products: {error?.message || "Unknown error"}
      </div>
    );
  }

  // Prepare and map data
  const allData =
    data?.products?.map((item: any) => ({
      id: item._id,
      image: item.images?.[0] || null,
      name: item.title,
      sku: item.sku,
      price: `$${item.price}`,
      stock: item.quantity,
      status:
        item.quantity === 0
          ? "Out of Stock"
          : item.quantity < 10
          ? "Low Stock"
          : "Active",
      category: item.category,
    })) || [];

  // Filtering logic
  const filteredData = allData.filter((item: any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.sku || "").toLowerCase().includes(search.toLowerCase());

    const matchesStock =
      stockStatus === "" ||
      (stockStatus === "active" && item.status === "Active") ||
      (stockStatus === "low" && item.status === "Low Stock") ||
      (stockStatus === "out" && item.status === "Out of Stock");

    const matchesCategory = category === "" || item.category === category;
    return matchesSearch && matchesStock && matchesCategory;
  });

  const handleDelete = async () => {
    await axiosInstance.delete(`/products/delete/${selectedProduct.id}`);
    toast.success("Product deleted successfully!");
    refetch();
    setDeleteModalOpen(false);
  };

  const columns = [
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) =>
        info.row.original.image ? (
          <img
            src={`${baseURL}/uploads/${info.row.original.image}`}
            alt={info.row.original.name}
            className="w-8 h-8 object-cover rounded"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded" />
        ),
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
      cell: (info) => {
        const status = info.getValue();
        let color = "bg-green-100 text-green-700";
        if (status === "Low Stock") color = "bg-yellow-100 text-yellow-700";
        if (status === "Out of Stock") color = "bg-red-100 text-red-700";
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <Link href={`/products/edit/${info.row.original.id}`}>
            <Button
              size="sm"
              variant="outline"
              className="px-2 py-1 h-8 cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          </Link>

          <Button
            size="sm"
            variant="outline"
            className="px-2 py-1 h-8 border-red-200 text-red-500 hover:bg-red-50"
            onClick={() => {
              setSelectedProduct(info.row.original);
              setDeleteModalOpen(true);
            }}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      ),
    }),
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link href="/products/add">
          <Button className={`${commonButtonStyle} cursor-pointer`}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Custom search and filter controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-6">
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

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader className="flex flex-col items-center">
            <AlertTriangle className="w-10 h-10 text-red-500 mb-2" />
            <DialogTitle className="text-center">Delete Product?</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete this product?
              <br />
              This action cannot be undone.
            </DialogDescription>
            <div className="font-semibold text-base mt-2">
              {selectedProduct?.name}
            </div>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
