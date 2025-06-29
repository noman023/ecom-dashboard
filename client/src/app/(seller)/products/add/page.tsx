"use client";
import {
  ProductForm,
  ProductFormType,
} from "@/components/custom/products/ProductForm";
import { axiosInstance } from "@/hooks/useAxiosInstance";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProduct() {
  const router = useRouter();

  const handleAdd = async (data: ProductFormType) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("storage", data.storage);
      formData.append("ram", data.ram);
      formData.append("colour", data.colour);
      formData.append("condition", data.condition);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);

      // Optional fields
      if (data.salePrice) formData.append("salePrice", data.salePrice);
      if (data.sku) formData.append("sku", data.sku);
      if (data.negotiation)
        formData.append("negotiation", String(data.negotiation));
      if (data.tags) formData.append("tags", data.tags);
      if (data.seoTitle) formData.append("seoTitle", data.seoTitle);
      if (data.seoDescription)
        formData.append("seoDescription", data.seoDescription);

      // Features (array)
      if (data.features && data.features.length > 0) {
        data.features.forEach((feature) =>
          formData.append("features", feature)
        );
      }

      // Images (FileList)
      const maxSize = 10 * 1024 * 1024;
      if (
        data.images &&
        Array.from(data.images).some((file) => file.size > maxSize)
      ) {
        toast.error("Each image must be 5MB or less.");
        return;
      }

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) =>
          formData.append("image", file)
        );
      }

      await axiosInstance.post("/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully!");
      router.push("/products");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error adding product.");
      console.error("Error adding product:", err);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <ArrowLeft
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">Add New Product</h1>
          <p className="text-gray-500 mb-6">
            Fill in the details to list your product for sale
          </p>
        </div>
      </div>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}
