"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTanstackQuery, { axiosInstance } from "@/hooks/useAxiosInstance";
import { toast } from "react-toastify";
import { commonButtonStyle } from "@/utils/commonButtonStyle";
import { baseURL } from "@/utils/baseURL";

export default function ShopPage() {
  const { data, isLoading, isError, error } = useTanstackQuery("/products");

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

  // In your Shop page, inside the Add to Cart button handler:
  const handleAddToCart = async (productId: string) => {
    try {
      await axiosInstance.post("/cart/add", { productId, quantity: 1 });
      toast.success("Added to cart!");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Could not add to cart");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shop Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product: any) => (
          <Card key={product._id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(product.images) && product.images.length > 0 && (
                <img
                  src={`${baseURL}/uploads/${product.images[0]}`}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <p className="text-gray-700 mb-2">{product.sku}</p>
              <div className="font-semibold text-lg mb-4">${product.price}</div>

              <Button
                onClick={() => handleAddToCart(product._id)}
                className={`${commonButtonStyle} w-full`}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
