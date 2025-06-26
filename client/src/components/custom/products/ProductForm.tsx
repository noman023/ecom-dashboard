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

const BRANDS = ["Apple", "Samsung", "OnePlus", "Xiaomi"];
const MODELS = ["iPhone 15", "Galaxy S24", "OnePlus 12", "Redmi Note 13"];
const STORAGES = ["64GB", "128GB", "256GB", "512GB"];
const RAMS = ["4GB", "6GB", "8GB", "12GB"];
const COLOURS = ["Black", "White", "Blue", "Red", "Green"];
const CONDITIONS = [
  "New",
  "Open Box",
  "Refurbished",
  "Very Good",
  "Good",
  "Used",
  "Defective",
];
const FEATURES = [
  "5G",
  "Wireless Charging",
  "Face ID",
  "Fingerprint",
  "Water Resistant",
];

const CATEGORIES = [
  { value: "mobile", label: "Mobile" },
  { value: "laptops-accessories", label: "Laptops & Accessories" },
  { value: "wearables", label: "Wearables" },
  { value: "headphones-audio", label: "Headphones & Audio" },
  { value: "kitchen-dining", label: "Kitchen & Dining" },
  { value: "mens-clothing", label: "Men’s Clothing" },
  { value: "womens-clothing", label: "Women’s Clothing" },
  { value: "kids-wear", label: "Kid’s Wear" },
  { value: "skincare", label: "Skincare" },
];

export type ProductFormType = {
  title: string;
  description: string;
  images: FileList | null;
  category: string;
  brand: string;
  model: string;
  storage: string;
  ram: string;
  colour: string;
  condition: string;
  features: string[];
  price: string;
  quantity: string;
  salePrice?: string;
  sku?: string;
  negotiation?: boolean;
  tags?: string;
  seoTitle?: string;
  seoDescription?: string;
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
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
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Enter Product Description"
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1"
          />
          {errors.description && (
            <span className="text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
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
          <button
            type="button"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            + Add another specification
          </button>
        </div>
        <div className="mb-4">
          <Label>
            Brand <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("brand", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {BRANDS.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.brand && (
            <span className="text-xs text-red-500">
              {errors.brand.message as string}
            </span>
          )}
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label>
              Model <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("model", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.model && (
              <span className="text-xs text-red-500">
                {errors.model.message as string}
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label>
              Storage <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("storage", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select Storage" />
              </SelectTrigger>
              <SelectContent>
                {STORAGES.map((storage) => (
                  <SelectItem key={storage} value={storage}>
                    {storage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.storage && (
              <span className="text-xs text-red-500">
                {errors.storage.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label>
              RAM <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("ram", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select Ram" />
              </SelectTrigger>
              <SelectContent>
                {RAMS.map((ram) => (
                  <SelectItem key={ram} value={ram}>
                    {ram}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ram && (
              <span className="text-xs text-red-500">
                {errors.ram.message as string}
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label>
              Colour <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("colour", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select Colour" />
              </SelectTrigger>
              <SelectContent>
                {COLOURS.map((colour) => (
                  <SelectItem key={colour} value={colour}>
                    {colour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.colour && (
              <span className="text-xs text-red-500">
                {errors.colour.message as string}
              </span>
            )}
          </div>
        </div>
        {/* condition & features */}
        <div className="flex gap-20">
          <div className="mb-4">
            <Label>
              Condition <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col gap-4 mt-2">
              {CONDITIONS.map((cond) => (
                <label
                  key={cond}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={cond}
                    {...register("condition", {
                      required: "Condition is required",
                    })}
                  />
                  <span>{cond}</span>
                </label>
              ))}
            </div>
            {errors.condition && (
              <span className="text-xs text-red-500">
                {errors.condition.message as string}
              </span>
            )}
          </div>
          <div className="mb-2">
            <Label>
              Features <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col gap-4 mt-2">
              {FEATURES.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={feature}
                    {...register("features", {
                      required: "Select at least one feature",
                    })}
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
            {errors.features && (
              <span className="text-xs text-red-500">
                {errors.features.message as string}
              </span>
            )}
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
            <Label>Sale Price($)</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("salePrice")}
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
          <div className="flex-1">
            <Label>SKU</Label>
            <Input
              placeholder="e.g. MP-001"
              {...register("sku")}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Negotiation Option */}
      <div className="border rounded-xl p-6 bg-white">
        <div className="mb-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("negotiation")} />
            <span>Enable Negotiation</span>
          </label>
        </div>
      </div>

      {/* Additional Information */}
      <div className="border rounded-xl p-6 bg-white">
        <h2 className="font-semibold text-lg mb-4">Additional Information</h2>
        <div className="mb-4">
          <Label>Tags</Label>
          <Input
            placeholder="e.g. smartphones, android, 5G (separate with commas)"
            {...register("tags")}
            className="mt-1"
          />
          <div className="text-xs text-gray-500">
            Tags help buyers find your product when searching
          </div>
        </div>
        <div className="mb-4">
          <Label>SEO Title</Label>
          <Input
            placeholder="Custom titles for search engines"
            {...register("seoTitle")}
            className="mt-1"
          />
        </div>
        <div>
          <Label>SEO Description</Label>
          <Textarea
            placeholder="Custom description for search engines"
            {...register("seoDescription")}
            className="mt-1"
          />
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
