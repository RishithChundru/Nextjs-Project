'use client';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { useStore } from '@/stores/useStore';

export default function HomePage() {
  const { data, isLoading } = useProducts();
  const { token, role } = useStore();

  return (
    <div>
      {role !== "ADMIN"? (
      <section className="text-center py-10 bg-orange-500 text-black rounded-xl mb-10">
        <h1 className="text-4xl font-bold">Welcome to Victory Shop</h1>
        <p className="mt-3 opacity-90">Find the Best Products here</p>
      </section>
      ):(
        <section className="text-center py-10 bg-orange-500 text-black rounded-xl mb-10">
        <h1 className="text-4xl font-bold">Welcome Admin to Victory Shop</h1>
        <p className="mt-3 opacity-90">MANAGE THE PRODUCTS</p>
      </section>

      )}

      {role !== "ADMIN"? (
      <h2 className="text-2xl font-bold mb-5">Latest Products</h2>
      ):(
        <h2 className="text-2xl font-bold mb-5">Manage Products</h2>
      )}

      {isLoading ? (
        <div className="text-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
