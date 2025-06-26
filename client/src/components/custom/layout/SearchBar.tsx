"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { commonButtonStyle } from "@/utils/commonButtonStyle";
import { ChevronDown, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
];

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isOpen, setIsOpen] = useState(false);

  const authState = useContext(AuthContext);
  const { userRole } = authState?.user || {};

  return (
    <div className="flex items-center gap-2 w-full my-5">
      {/* Search Input with Categories */}
      <div className="flex flex-1 items-center border rounded-lg">
        {/* Categories Dropdown moved inside */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm border-r"
          >
            <span>{selectedCategory}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 z-10 py-1 bg-white border rounded-lg shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Search by product, brand, or keyword"
          className="w-full px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      <Button className={commonButtonStyle}>Search</Button>

      {/* for customer only */}
      {userRole === "customer" && (
        <div className="flex items-center gap-4 ml-4 text-gray-600">
          <Link href={`/wishlist`}>
            <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
              <Heart className="w-6 h-6 " />
              <p>Wishlist</p>
            </div>
          </Link>

          <Link href={"/cart"}>
            <div className="flex items-center gap-1 cursor-pointer">
              <ShoppingCart className="w-6 h-6 " />
              <p>Cart</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
