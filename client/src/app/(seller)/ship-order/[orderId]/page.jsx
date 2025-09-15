"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, MessageCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useTanstackQuery, { axiosInstance } from "@/hooks/useAxiosInstance";
import { baseURL } from "@/utils/baseURL";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ShipOrderPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const { data, isLoading, refetch } = useTanstackQuery(`/orders/${orderId}`);
  const [loading, setLoading] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.order) return <div>Order not found</div>;

  const order = data.order;

  // Timeline logic based on order.status
  const timelineSteps = [
    { label: "Order Placed", key: "placed" },
    { label: "Payment Confirmed", key: "paid" },
    { label: "Processed", key: "processed" },
    { label: "Shipped", key: "shipped" },
    { label: "Delivered", key: "delivered" },
  ];
  const statusIndex =
    {
      Pending: 0,
      Paid: 1,
      Processed: 2,
      Shipped: 3,
      Delivered: 4,
    }[order.status] ?? 0;

  const handleShipOrder = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/orders/${order._id}/status`, {
        status: "Shipped",
      });
      toast.success("Order marked as shipped!");
      refetch();
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Could not update order status"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
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
            {order.items[0]?.product?.image ? (
              <img
                src={`${order.items[0].product.image}`}
                alt={order.items[0].product.title}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-400 text-xs">IMG</span>
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold">
              {order.items[0]?.product?.title}
            </div>
            <div className="flex gap-4 text-xs text-gray-500 mt-1">
              <span>
                <span className="font-medium text-gray-700">Order ID</span>:
                ORD-{order._id.slice(-6)}
              </span>
              <span>
                <span className="font-medium text-gray-700">Date</span>:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span>
                <span className="font-medium text-gray-700">Quantity</span>:{" "}
                {order.items[0]?.quantity}
              </span>
              <span>
                <span className="font-medium text-gray-700">Condition</span>:{" "}
                {order.items[0]?.product?.condition || "N/A"}
              </span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              order.status === "Pending"
                ? "bg-orange-100 text-orange-700"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-700"
                : order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="border rounded-sm p-4">
            <div className="font-semibold mb-2">Timeline</div>
            <ol className="relative border-l border-gray-200">
              {timelineSteps.map((step, idx) => (
                <li key={step.key} className="mb-6 ml-4">
                  <div
                    className={`absolute w-3 h-3 rounded-full -left-1.5 top-1.5 ${
                      idx <= statusIndex ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        idx <= statusIndex ? "text-blue-700" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {idx <= statusIndex
                        ? new Date(order.createdAt).toLocaleDateString()
                        : idx === statusIndex + 1
                        ? "Waiting for " + step.label.toLowerCase()
                        : ""}
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
              <div>{order.buyer?.name}</div>
              <div className="text-xs text-gray-500">{order.buyer?.email}</div>
            </div>
            <div className="mb-2">
              <span className="font-medium">Shipping Address</span>
              <div className="text-xs text-gray-700">
                {order.shippingAddress?.address}, {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-medium">Payment Method</span>
              <div className="text-xs text-gray-700">
                {order.paymentMethod?.toUpperCase()}
                {order.status === "Paid" && (
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
              <span>${order.total?.toFixed(2) ?? "N/A"}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Discount</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total</span>
              <span>${order.total?.toFixed(2) ?? "N/A"}</span>
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
          <Button
            variant="destructive"
            onClick={handleShipOrder}
            loading={loading}
          >
            Ship Order
          </Button>
        </div>
      </div>
    </div>
  );
}
