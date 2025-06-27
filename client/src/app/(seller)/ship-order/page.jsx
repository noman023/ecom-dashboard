"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, MessageCircle } from "lucide-react";

export default function ShipOrderPage() {
  // Dummy data for demonstration
  const order = {
    product: {
      title: "Over The Head Wireless Headphone",
      image: "",
      condition: "New",
    },
    orderId: "Ord-001",
    date: "May 15, 2025",
    quantity: 1,
    status: "Pending",
    timeline: [
      { label: "Order Placed", date: "May 15, 2025", done: true },
      { label: "Payment Confirmed", date: "May 15, 2025", done: true },
      { label: "Processed", date: null, done: false },
      { label: "Shipped", date: null, done: false },
      { label: "Delivered", date: null, done: false },
    ],
    buyer: {
      name: "Mike Turner",
      email: "example@email.com",
      address: "62 Elm Tree Ave, Coventry, West Midlands, UK",
    },
    payment: {
      method: "Credit Card",
      card: "**** **** **** 4242",
      paid: true,
    },
    paymentInfo: {
      subtotal: 99.99,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 99.99,
    },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between  mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => window.history.back()}
          />

          <h2 className="text-xl font-semibold">Order Details</h2>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-1" /> Print Invoice
          </Button>
          <Button variant="destructive" size="sm">
            <MessageCircle className="w-4 h-4 mr-1" /> Contact Buyer
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg border p-6">
        {/* Product Row */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
            {/* Product image */}
            {order.product.image ? (
              <img
                src={order.product.image}
                alt={order.product.title}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-400 text-xs">IMG</span>
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold">{order.product.title}</div>
            <div className="flex gap-4 text-xs text-gray-500 mt-1">
              <span>
                <span className="font-medium text-gray-700">Order ID</span>:{" "}
                {order.orderId}
              </span>
              <span>
                <span className="font-medium text-gray-700">Date</span>:{" "}
                {order.date}
              </span>
              <span>
                <span className="font-medium text-gray-700">Quantity</span>:{" "}
                {order.quantity}
              </span>
              <span>
                <span className="font-medium text-gray-700">Condition</span>:{" "}
                {order.product.condition}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
            {order.status}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="border rounded-sm p-4">
            <div className="font-semibold mb-2">Timeline</div>
            <ol className="relative border-l border-gray-200">
              {order.timeline.map((step, idx) => (
                <li key={idx} className="mb-6 ml-4">
                  <div
                    className={`absolute w-3 h-3 rounded-full -left-1.5 top-1.5 ${
                      step.done ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        step.done ? "text-blue-700" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {step.date
                        ? step.date
                        : step.done
                        ? ""
                        : "Waiting for " + step.label.toLowerCase()}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Buyer Info */}
          <div className="border rounded-sm p-4">
            <div className="font-semibold mb-2">Buyer Information</div>
            <div className="mb-2">
              <span className="font-medium">Buyer</span>
              <div>{order.buyer.name}</div>
              <div className="text-xs text-gray-500">{order.buyer.email}</div>
            </div>
            <div className="mb-2">
              <span className="font-medium">Shipping Address</span>
              <div className="text-xs text-gray-700">{order.buyer.address}</div>
            </div>
            <div className="mb-2">
              <span className="font-medium">Payment Method</span>
              <div className="text-xs text-gray-700">
                {order.payment.method}{" "}
                <span className="ml-2">{order.payment.card}</span>
                {order.payment.paid && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">
                    Paid
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border rounded-sm p-4">
            <div className="font-semibold mb-2">Payment Info</div>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal</span>
              <span>${order.paymentInfo.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Shipping</span>
              <span>${order.paymentInfo.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tax</span>
              <span>${order.paymentInfo.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Discount</span>
              <span>${order.paymentInfo.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total</span>
              <span>${order.paymentInfo.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Cancel Order
          </Button>
          <Button variant="destructive">Ship Order</Button>
        </div>
      </div>
    </div>
  );
}
