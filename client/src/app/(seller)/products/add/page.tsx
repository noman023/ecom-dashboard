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
      formData.append("color", data.color);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);

      // Optional fields
      if (data.wholesalePrice)
        formData.append("wholesalePrice", data.wholesalePrice);

      // Image (FileList)
      const maxSize = 10 * 1024 * 1024;
      if (
        data.image &&
        Array.from(data.image).some((file) => file.size > maxSize)
      ) {
        toast.error("Image must be 10MB or less.");
        return;
      }

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
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
