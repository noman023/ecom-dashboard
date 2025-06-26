"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/hooks/useAxiosInstance";
import { toast } from "react-toastify";
import { commonButtonStyle } from "@/utils/commonButtonStyle";

const products = [
  {
    id: 1,
    image: null,
    name: "Premium Cotton T-Shirt",
    sku: "TS-001",
    price: "$100",
    stock: 200,
    status: "Active",
    category: "apparel",
  },
  {
    id: 2,
    image: null,
    name: "Leather Wallet",
    sku: "WL-002",
    price: "$50",
    stock: 200,
    status: "Active",
    category: "accessories",
  },
];

export default function ShopPage() {
  //   const [products, setProducts] = useState(products);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     axiosInstance
  //       .get("/products")
  //       .then((res) => setProducts(res.data.products))
  //       .catch(() => toast.error("Failed to load products"))
  //       .finally(() => setLoading(false));
  //   }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shop Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {product.image && (
                <img
                  src={`/api/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <p className="text-gray-700 mb-2">{product.sku}</p>
              <div className="font-semibold text-lg mb-4">${product.price}</div>

              <Button className={`${commonButtonStyle} w-full`}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
