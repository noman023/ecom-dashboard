"use client";
import { Link, Trash, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import { commonButtonStyle } from "@/utils/commonButtonStyle";

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing & Fashion" },
  { value: "home-garden", label: "Home & Garden" },
  { value: "food-beverages", label: "Food & Beverages" },
  { value: "health-beauty", label: "Health & Beauty" },
  { value: "sports-outdoors", label: "Sports & Outdoors" },
  { value: "books-media", label: "Books & Media" },
  { value: "toys-games", label: "Toys & Games" },
  { value: "automotive", label: "Automotive" },
  { value: "office-supplies", label: "Office Supplies" },
];

export type ProductFormType = {
  title: string;
  description: string;
  images: FileList | null;
  category: string;
  brand: string;
  color: string;
  price: string;
  quantity: string;
  wholesalePrice?: string;
};

type ProductFormProps = {
  defaultValues?: Partial<ProductFormType>;
  onSubmit: (data: ProductFormType) => void;
  isEdit?: boolean;
};

export function ProductForm({
  defaultValues,
  onSubmit,
  isEdit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProductFormType>({ defaultValues });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* General Information */}
      <div className="border rounded-xl p-6 bg-white">
        <h2 className="font-semibold text-lg mb-4">General Information</h2>
        <div className="mb-4">
          <Label htmlFor="title">
            Product Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter Product Name"
            {...register("title", { required: "Product title is required" })}
            className="mt-1"
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter Product Description"
            rows={4}
            {...register("description")}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label>
            Product Images <span className="text-red-500">*</span>
          </Label>
          <div
            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            <div className="font-medium mb-1">
              Drag &amp; drop product images
            </div>
            <div className="text-xs text-gray-500 mb-2">
              or click to browse files (PNG, JPG, WEBP up to 5MB each)
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Files
            </Button>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              {...register("images", {
                required: "At least one image is required",
              })}
              ref={fileInputRef}
              onChange={(e) => setValue("images", e.target.files)}
            />
            {watch("images") && (
              <div className="mt-2 text-xs text-gray-600">
                {Array.from(watch("images") as FileList).map((file) => (
                  <div key={file.name}>{file.name}</div>
                ))}
              </div>
            )}
          </div>
          {errors.images && (
            <span className="text-xs text-red-500">
              {errors.images.message as string}
            </span>
          )}
        </div>
        <div className="mb-2">
          <Label>
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("category", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <span className="text-xs text-red-500">
              {errors.category.message as string}
            </span>
          )}
        </div>
      </div>

      {/* Specifications */}
      <div className="border rounded-xl p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Specifications</h2>
        </div>

        <div className="flex items-center justify-betweeen gap-4">
          <div className="flex-1 mb-4">
            <Label>Brand</Label>

            <Input
              {...register("brand")}
              placeholder="Ex: Walton"
              className="mt-1"
            />
          </div>

          <div className="flex-1 mb-4">
            <Label>Color</Label>

            <Input {...register("color")} className="mt-1" />
          </div>
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="border rounded-xl p-6 bg-white">
        <h2 className="font-semibold text-lg mb-4">Pricing & Inventory</h2>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label>
              Price($) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price", { required: "Price is required" })}
              className="mt-1"
            />
            {errors.price && (
              <span className="text-xs text-red-500">
                {errors.price.message as string}
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label>Wholesale Price($)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("wholesalePrice")}
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label>
              Quantity <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              min="0"
              placeholder="0"
              {...register("quantity", { required: "Quantity is required" })}
              className="mt-1"
            />
            {errors.quantity && (
              <span className="text-xs text-red-500">
                {errors.quantity.message as string}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-3 flex justify-between items-center gap-4">
        <Button
          variant={"outline"}
          className="border-red-500 text-red-500 cursor-pointer hover:bg-red-600 hover:text-white"
          type="button"
          onClick={() => window.history.back()}
        >
          <Trash className="w-4 h-4" />
          Discard
        </Button>

        <Button type="submit" className={`${commonButtonStyle} cursor-pointer`}>
          {isEdit ? "Update Product" : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
