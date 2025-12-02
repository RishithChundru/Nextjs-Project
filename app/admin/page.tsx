"use client";

import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { useStore } from "../../stores/useStore";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { role, token } = useStore();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (role !== "ADMIN") {
    return <div className="text-center text-red-600 mt-10">Access Denied</div>;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.patch(`/products/${editingProduct.id}`, {
          title,
          description,
          price: Number(price),
          image,
        });
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", {
          title,
          description,
          price: Number(price),
          image,
        });
        toast.success("Product added successfully");
      }

      setEditingProduct(null);
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");

      loadProducts();
    } catch (error) {
      toast.error("Error saving product");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      loadProducts();
    } catch (err) {
      toast.error("Error deleting product");
    }
  };

  const startEdit = (p: any) => {
    setEditingProduct(p);
    setTitle(p.title);
    setDescription(p.description);
    setPrice(p.price);
    setImage(p.image || "");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-3 bg-gray-100 rounded"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full p-3 bg-gray-100 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="w-full p-3 bg-gray-100 rounded"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            className="w-full p-3 bg-gray-100 rounded"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button className="bg-black text-white px-4 py-2 rounded">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setTitle("");
                setDescription("");
                setPrice("");
                setImage("");
              }}
              className="ml-3 bg-gray-300 px-3 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <h2 className="text-xl font-bold mb-3">Product List</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-gray-500 text-sm">{p.description}</p>
              <p className="font-bold mt-1">₹{p.price}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => startEdit(p)}
                  className="px-3 py-1 bg-orange-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
