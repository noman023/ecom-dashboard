"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { commonButtonStyle } from "@/utils/commonButtonStyle";
import useTanstackQuery from "@/hooks/useAxiosInstance";
import { baseURL } from "@/utils/baseURL";
import Link from "next/link";

export default function CartPage() {
  const [selected, setSelected] = useState<{ [id: string]: boolean }>({});
  const [promo, setPromo] = useState("");
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({}); // <-- move here

  const { data, isLoading, isError, error } = useTanstackQuery("/cart");

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

  // Group cart items by seller name
  const grouped = (data?.items || []).reduce((acc: any, cartItem: any) => {
    const sellerName = cartItem.product.seller?.name || "Unknown Store";
    if (!acc[sellerName]) {
      acc[sellerName] = { store: sellerName, items: [] };
    }
    acc[sellerName].items.push({
      id: cartItem.product._id,
      name: cartItem.product.title,
      variant: cartItem.product.model,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      image: cartItem.product.image || "",
    });
    return acc;
  }, {});
  const cartData = Object.values(grouped) as { store: string; items: any[] }[];

  // Calculate totals
  const allItems = cartData.flatMap((s: any) => s.items);
  const selectedItems = allItems.filter((item: any) => selected[item.id]);
  const subtotal = selectedItems.reduce(
    (sum: number, item: any) =>
      sum + (quantities[item.id] || item.quantity || 1) * item.price,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  // Selection logic
  const toggleAll = (checked: boolean) => {
    const updates: { [id: string]: boolean } = {};
    cartData.forEach((store: any) =>
      store.items.forEach((item: any) => {
        updates[item.id] = checked;
      })
    );
    setSelected(updates);
  };

  const toggleStore = (store: string, checked: boolean) => {
    const storeObj = cartData.find((w: any) => w.store === store);
    if (!storeObj) return;
    const updates: { [id: string]: boolean } = {};
    storeObj.items.forEach((item: any) => {
      updates[item.id] = checked;
    });
    setSelected((prev) => ({ ...prev, ...updates }));
  };

  const toggleItem = (id: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  };

  const allSelected = () => allItems.every((item: any) => selected[item.id]);
  const storeAllSelected = (store: string) => {
    const storeObj = cartData.find((w: any) => w.store === store);
    if (!storeObj || !storeObj.items) return false;
    return storeObj.items.every((item: any) => selected[item.id]);
  };

  const handleQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = { ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) };
      return next;
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-gray-500 mb-4">
          You have {allItems.length} items in your cart.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <div className="w-full md:w-3/5 bg-white rounded-lg border mb-6">
          <div className="flex items-center px-4 py-3 border-b gap-2">
            <Checkbox
              checked={allSelected()}
              onCheckedChange={(checked) => toggleAll(!!checked)}
            />
            <span className="font-medium text-sm">
              Select All ({allItems.length} items)
            </span>
            <Button size="sm" variant="ghost" className="ml-auto text-red-500">
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>

          {cartData.map((store: any) => (
            <div key={store.store} className="border-b last:border-b-0">
              <div className="flex items-center px-4 py-3 border-b gap-2 bg-gray-50">
                <Checkbox
                  checked={storeAllSelected(store.store)}
                  onCheckedChange={(checked) =>
                    toggleStore(store.store, !!checked)
                  }
                />
                <span className="ml-2 font-semibold">{store.store} Store</span>
              </div>
              {store.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center px-4 py-4 border-b last:border-b-0"
                >
                  <Checkbox
                    checked={!!selected[item.id]}
                    onCheckedChange={(checked) =>
                      toggleItem(item.id, !!checked)
                    }
                  />
                  <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center ml-4 mr-4">
                    {item.image ? (
                      <img
                        src={`${baseURL}/uploads/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">IMG</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.variant}</div>
                    <div className="font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQty(item.id, -1)}
                      className="w-8 h-8"
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">
                      {quantities[item.id]}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQty(item.id, 1)}
                      className="w-8 h-8"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-400 hover:text-red-500 ml-2"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-2/5">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Enter a promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1"
              />

              <Button className={commonButtonStyle}>Apply</Button>
            </div>

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout">
              <Button
                className={`${commonButtonStyle} w-full`}
                // store selected items on localStorage
                onClick={() => {
                  localStorage.setItem(
                    "checkoutItems",
                    JSON.stringify(selectedItems)
                  );
                }}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
