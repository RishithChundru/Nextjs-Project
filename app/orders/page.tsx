"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { useStore } from "../../stores/useStore";

type Order = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
};

export default function OrdersPage() {
  const { token } = useStore();
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      return res.data;
    },
    enabled: mounted && !!token,
  });

  const cancelMutation = useMutation({
    mutationFn: async (orderId: string) => {
      await api.post(`/orders/cancel/${orderId}`);
    },
    onSuccess: () => {
      toast.success("Order cancelled");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: () => toast.error("Failed to cancel"),
  });

  if (!mounted) return <div className="p-6 text-center">Loading...</div>;

  if (!token)
    return <div className="p-6 text-center">Please login to view orders.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {isLoading && <div>Loading orders...</div>}

      {orders && orders.length === 0 && <div>No orders placed yet.</div>}

      {orders?.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow rounded p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <p><b>Order Id:</b>{order.id}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
          </div>

          {order.status === "PENDING" && (
            <button
              onClick={() => cancelMutation.mutate(order.id)}
              disabled={cancelMutation.isPending}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
