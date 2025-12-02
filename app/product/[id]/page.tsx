'use client';
import { useRouter, useParams } from 'next/navigation';
import { useProduct } from '../../../hooks/useProduct';
import { useAddToCart } from '../../../hooks/useCartApi';
import { useStore } from '../../../stores/useStore';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const id = (params as any).id;
  const { data: product, isLoading } = useProduct(id);
  const addToCart = useAddToCart();
  const { token, role } = useStore();
  const [qty, setQty] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  function handleAdd() {
    if (!token) return alert('Please login to add to cart');
    addToCart.mutate({ productId: product.id, quantity: qty });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded shadow-sm">
        <div className="h-96 flex items-center justify-center bg-slate-100">
          {product.image ? <img src={product.image} className="h-full" /> : <div>No Image</div>}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-slate-700">{product.description}</p>
        <div className="mt-4 text-xl font-bold">₹{product.price}</div>


        {role !== "ADMIN" ? (
        <div className="mt-6 flex items-center gap-2">
          <input type="number" value={qty} min={1} onChange={(e) => setQty(Number(e.target.value))} className="w-20 p-2 border rounded" />
          <button onClick={handleAdd} className="px-4 py-2 bg-orange-500 text-white rounded">Add to cart</button>
        </div>
      
       ) : (<p className="text-gray-500 italic mt-4">
              Admins cannot add items to cart.
            </p>
          )}
          <div className="mt-6">
            <Link href="/" className="text-orange-500 hover:underline">
              ← Back to Home
            </Link>
          </div>

          </div>
    </div>
  );
}
