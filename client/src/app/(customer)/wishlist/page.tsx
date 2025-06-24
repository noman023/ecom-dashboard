"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { commonButtonStyle } from "@/utils/commonButtonStyle";
import { Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";

const wishlistData = [
  {
    store: "Tech Gadget Store",
    items: [
      {
        id: "1",
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Black | Premium Edition",
        price: 249.99,
        image: "",
      },
      {
        id: "2",
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Black | Premium Edition",
        price: 249.99,
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
        image: "",
      },
      {
        id: "4",
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Black | Premium Edition",
        price: 249.99,
        image: "",
      },
    ],
  },
];

export default function Wishlist() {
  const [selected, setSelected] = useState<{ [id: string]: boolean }>({});

  const toggleAll = (store: string, checked: boolean) => {
    const storeObj = wishlistData.find((w) => w.store === store);
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

  const allSelected = (store: string) => {
    const storeObj = wishlistData.find((w) => w.store === store);
    if (!storeObj) return false;
    return storeObj.items.every((item) => selected[item.id]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div>
          <h1 className="text-2xl font-bold">Wishlist</h1>
          <p className="text-gray-500 text-sm">
            Manage your saved items across multiple wishlists.
          </p>
        </div>

        <Button className={commonButtonStyle}>
          <Plus className="w-4 h-4 mr-1" /> Create New List
        </Button>
      </div>

      <div className="flex items-center gap-2 my-4">
        <Checkbox
          checked={wishlistData.every((store) =>
            store.items.every((item) => selected[item.id])
          )}
          onCheckedChange={(checked) => {
            const updates: { [id: string]: boolean } = {};
            wishlistData.forEach((store) =>
              store.items.forEach((item) => {
                updates[item.id] = !!checked;
              })
            );
            setSelected(updates);
          }}
        />
        <span className="font-medium text-sm">Add All To Cart</span>
      </div>

      {wishlistData.map((store) => (
        <div key={store.store} className="bg-white rounded-lg border mb-6">
          <div className="flex items-center px-4 py-3 border-b">
            <Checkbox
              checked={allSelected(store.store)}
              onCheckedChange={(checked) => toggleAll(store.store, !!checked)}
            />
            <span className="ml-2 font-semibold">{store.store}</span>
          </div>

          {/* items */}
          <div>
            {store.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center px-4 py-4 border-b last:border-b-0"
              >
                <Checkbox
                  checked={!!selected[item.id]}
                  onCheckedChange={(checked) => toggleItem(item.id, !!checked)}
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
                    size="sm"
                    variant="outline"
                    className="text-gray-500 border-gray-300 hover:bg-gray-100"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
