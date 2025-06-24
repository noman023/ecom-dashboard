"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { commonButtonStyle } from "@/utils/commonButtonStyle";

const cartData = [
  {
    store: "Tech Gadget Store",
    items: [
      {
        id: "1",
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Black | Premium Edition",
        price: 249.99,
        quantity: 1,
        image: "",
      },
      {
        id: "2",
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Black | Premium Edition",
        price: 249.99,
        quantity: 1,
        image: "",
      },
    ],
  },
  {
    store: "Super Gadgets",
    items: [
      {
        id: "3",
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Black | Premium Edition",
        price: 249.99,
        quantity: 1,
        image: "",
      },
      {
        id: "4",
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Black | Premium Edition",
        price: 249.99,
        quantity: 1,
        image: "",
      },
    ],
  },
];

export default function CartPage() {
  const [selected, setSelected] = useState<{ [id: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [id: string]: number }>(() => {
    const q: { [id: string]: number } = {};
    cartData.forEach((store) =>
      store.items.forEach((item) => {
        q[item.id] = item.quantity;
      })
    );
    return q;
  });
  const [promo, setPromo] = useState("");

  // Calculate totals
  const allItems = cartData.flatMap((s) => s.items);
  const subtotal = allItems.reduce(
    (sum, item) => sum + (quantities[item.id] || 1) * item.price,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const toggleAll = (checked: boolean) => {
    const updates: { [id: string]: boolean } = {};
    cartData.forEach((store) =>
      store.items.forEach((item) => {
        updates[item.id] = checked;
      })
    );
    setSelected(updates);
  };

  const toggleStore = (store: string, checked: boolean) => {
    const storeObj = cartData.find((w) => w.store === store);
    if (!storeObj) return;
    const updates: { [id: string]: boolean } = {};
    storeObj.items.forEach((item) => {
      updates[item.id] = checked;
    });
    setSelected((prev) => ({ ...prev, ...updates }));
  };

  const toggleItem = (id: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  };

  const allSelected = () => allItems.every((item) => selected[item.id]);
  const storeAllSelected = (store: string) => {
    const storeObj = cartData.find((w) => w.store === store);
    if (!storeObj) return false;
    return storeObj.items.every((item) => selected[item.id]);
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

          {cartData.map((store) => (
            <div key={store.store} className="border-b last:border-b-0">
              <div className="flex items-center px-4 py-3 border-b gap-2 bg-gray-50">
                <Checkbox
                  checked={storeAllSelected(store.store)}
                  onCheckedChange={(checked) =>
                    toggleStore(store.store, !!checked)
                  }
                />
                <span className="ml-2 font-semibold">{store.store}</span>
              </div>
              {store.items.map((item) => (
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
                    {/* Placeholder for image */}
                    <span className="text-gray-400 text-xs">IMG</span>
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

            <Button className={`${commonButtonStyle} w-full`}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
