"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { commonButtonStyle } from "@/utils/commonButtonStyle";

const cartItems = [
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
];

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState("home");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promo, setPromo] = useState("");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">CHECKOUT</h1>
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="font-semibold text-blue-500">Cart</span>
        <span className="text-gray-400">{">"}</span>
        <span className="font-semibold text-blue-500">Checkout</span>
        <span className="text-gray-400">{">"}</span>
        <span className="text-gray-400">Order Complete</span>
      </div>

      {/* Shipping Information */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="font-semibold mb-4">Shipping Information</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <RadioGroup
            value={shippingMethod}
            onValueChange={setShippingMethod}
            className="flex flex-row gap-4"
          >
            <label
              className={`flex items-center gap-2 border rounded-md px-4 py-2 cursor-pointer ${
                shippingMethod === "home" ? "border-red-500" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="home" />
              <span>Home Delivery</span>
            </label>
            <label
              className={`flex items-center gap-2 border rounded-md px-4 py-2 cursor-pointer ${
                shippingMethod === "store"
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="store" />
              <span>Store Pickup</span>
            </label>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Full Name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Street address"
              value={address.address}
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
              className="mb-2"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-1">
              Zip/Postal Code <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Zip/Postal Code"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Country"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              className="mb-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Checkbox id="save-address" />
          <label htmlFor="save-address" className="text-sm text-gray-600">
            Save this address for future orders
          </label>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="font-semibold mb-4">Payment Method</h2>
        <div className="flex flex-col gap-2 mb-4">
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="flex flex-row gap-4"
          >
            <label
              className={`flex items-center gap-2 border rounded-md px-4 py-2 cursor-pointer ${
                paymentMethod === "cod" ? "border-red-500" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="cod" />
              <span>Cash on Delivery</span>
            </label>
            <label
              className={`flex items-center gap-2 border rounded-md px-4 py-2 cursor-pointer ${
                paymentMethod === "card" ? "border-red-500" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="card" />
              <span>Credit/Debit Card</span>
            </label>
          </RadioGroup>
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-md px-4 py-2 mb-2">
          <AlertCircle className="w-4 h-4" />
          <span>
            For security, we do not store your card details. All payments are
            processed securely.
          </span>
        </div>
        {paymentMethod === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Number <span className="text-red-500">*</span>
              </label>
              <Input placeholder="Card Number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Name on Card <span className="text-red-500">*</span>
              </label>
              <Input placeholder="Name on Card" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <Input placeholder="MM/YY" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                CVV <span className="text-red-500">*</span>
              </label>
              <Input placeholder="CVV" />
            </div>
          </div>
        )}
      </div>

      {/* Promo code */}
      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Promo code"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          className="w-60"
        />
        <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold">
          Apply
        </Button>
      </div>

      {/* Order Summary */}
      <div className="bg-white border rounded-lg p-6 mb-5">
        <h2 className="font-semibold mb-4">Order Summary</h2>

        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center py-3">
              <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                <span className="text-gray-400 text-xs">IMG</span>
              </div>

              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.variant}</div>
              </div>

              <div className="w-16 text-right font-medium">
                ${item.price.toFixed(2)}
              </div>

              <div className="w-12 text-center text-gray-500">
                x{item.quantity}
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

        <div className="flex justify-between mt-4 mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-end">
          <Button className={commonButtonStyle}>Place Order</Button>
        </div>
      </div>
    </div>
  );
}
