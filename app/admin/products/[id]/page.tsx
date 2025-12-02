'use client';
import { useProduct } from "../../../../hooks/useProduct";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import api from "../../../../lib/axios";
import toast from "react-hot-toast";

export default function EditProduct() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { data } = useProduct(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        description: data.description,
        price: String(data.price),
        category: data.categoryId ?? "",
        image: data.image ?? "",
      });
    }
  }, [data]);

  async function updateProduct(e: any) {
    e.preventDefault();

    await api.patch(`/products/${id}`, {
      ...form,
      price: Number(form.price)
    });

    toast.success("Product updated!");
    router.push("/admin/products");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={updateProduct} className="space-y-4 max-w-lg">
        <input
          value={form.title}
          className="w-full p-3 bg-gray-100 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          value={form.description}
          className="w-full p-3 bg-gray-100 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          value={form.price}
          className="w-full p-3 bg-gray-100 rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          value={form.category}
          className="w-full p-3 bg-gray-100 rounded"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          value={form.image}
          className="w-full p-3 bg-gray-100 rounded"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button className="w-full p-3 bg-blue-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
