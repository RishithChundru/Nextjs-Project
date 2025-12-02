'use client';
import Link from 'next/link';
import { useAddToCart } from '../hooks/useCartApi';
import { useStore } from '../stores/useStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: any) {
  const addToCart = useAddToCart();
  const { token, role } = useStore();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
      <div className="h-48 bg-gray-100 rounded flex items-center justify-center overflow-hidden mb-4">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title}
            className="object-contain h-full"
          />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
        {product.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-700">₹{product.price}</span>

        <div className="flex gap-2">
          <Link
            href={`/product/${product.id}`}
            className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-orange-200 text-sm"
          >
            View
          </Link>
          {role !== "ADMIN" && (
            <button
              onClick={() => {
                if (!token) return alert('Please login');
                addToCart.mutate(
                  { productId: product.id, quantity: 1 },
                  {
                    onSuccess: () => {
                      toast.success(`${product.title} Added to cart!`);
                    },
                    onError: () => {
                      toast.error("Failed to add to cart.");
                    }
                  }
                );
              }}
              className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
