"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { useStore } from "../../../stores/useStore";

export default function AdminOrders() {
  const { role } = useStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (role === "ADMIN") {
      api.get("/orders/admin/all")
        .then((res) => setOrders(res.data))
        .catch(() => toast.error("Failed to load orders"));
    }
  }, [role]);

  if (role !== "ADMIN")
    return <div className="p-6 text-center text-red-500">Access Denied</div>;

  const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Order Management</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders available.</p>
      )}

      {orders.map((order: any) => (
        <div key={order.id} className="bg-white shadow p-5 rounded mb-4">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>User:</b> {order.userId}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Status:</b> {order.status}</p>

          <select
            className="mt-3 p-2 border rounded"
            value={order.status}
            onChange={(e) => {
              api
                .post(`/orders/admin/update-status/${order.id}`, {
                  status: e.target.value,
                })
                .then(() => {
                  toast.success("Status updated");
                  api.get("/orders/admin/all").then((res) => setOrders(res.data));
                })
                .catch(() => toast.error("Failed to update status"));
            }}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
