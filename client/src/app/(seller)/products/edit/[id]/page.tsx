"use client";
import { ArrowLeft } from "lucide-react";

export default function EditProduct() {
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

      <form></form>
    </div>
  );
}
