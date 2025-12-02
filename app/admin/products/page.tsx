'use client';

export default function AdminProducts() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <a
        href="/admin/products/add"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add New Product
      </a>
    </div>
  );
}
