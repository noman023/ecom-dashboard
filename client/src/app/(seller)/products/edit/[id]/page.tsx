"use client";

import {
  ProductForm,
  ProductFormType,
} from "@/components/custom/products/ProductForm";

import { ArrowLeft } from "lucide-react";

export default function EditProduct() {
  const handleEdit = (data: ProductFormType) => {
    // handle add logic (API call, etc.)
    console.log(data);
  };

  return (
    <div>
      <div className="flex gap-2">
        <ArrowLeft
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">Edit Product Details</h1>

          <p className="text-gray-500 mb-6">
            Edit the details of your product.
          </p>
        </div>
      </div>

      <ProductForm onSubmit={handleEdit} isEdit />
    </div>
  );
}
