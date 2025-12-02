"use client";

import { useCart } from "../../hooks/useCartApi";
import { useStore } from "../../stores/useStore";
import { useRemoveCartItem } from "../../hooks/useCartApi";
import { useProducts } from "../../hooks/useProducts";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function CartPage() {
  const { token } = useStore();
  const { data: items, isLoading } = useCart(token ? "user" : null);
  const removeMutation = useRemoveCartItem();
  const { data: products } = useProducts();

  if (!token) return <div>Please login to see the cart</div>;
  if (isLoading) return <div>Loading cart...</div>;
  if (!items || items.length === 0) return <div>Your cart is empty</div>;

  const productLookup: any = {};
  products?.forEach((p: any) => (productLookup[p.id] = p));

  return (
    <div>
      <h2 className="text-2xl mb-4">Cart</h2>
      <div className="space-y-4">
        {items.map((it: any) => (
          <div
            key={it.id}
            className="bg-white p-4 rounded flex justify-between"
          >
            <div>
              <div className="font-medium">
                {productLookup[it.productId]?.title || "Unknown Product"}
              </div>
              <div className="text-sm text-slate-600">Qty: {it.quantity}</div>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() =>
                  removeMutation.mutate(it.id, {
                    onSuccess: () => {
                      toast.success(
                        `${
                          productLookup[it.productId]?.title
                        } Removed from cart!`
                      );
                    },
                    onError: () => {
                      toast.error("Failed to remove item.");
                    },
                  })
                }
                className="px-3 py-1.5 border border-red-500 text-red-500 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() =>
            api
              .post("/orders", {
                items: items.map((it: any) => ({
                  productId: it.productId,
                  quantity: it.quantity,
                  price: productLookup[it.productId]?.price,
                })),
              })
              .then(() => toast.success("Order placed!"))
              .catch((err) => {
                console.log("ORDER ERROR ===>", err.response?.data);
                toast.error(
                  err.response?.data?.message || "Failed to place order"
                );
              })
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
