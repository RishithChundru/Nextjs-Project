import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export function useCart(userId?: string | null) {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      const { data } = await api.get('/cart');
      return data;
    },
    enabled: !!userId,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { productId: string; quantity: number }) => {
      const { data } = await api.post('/cart', payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] }); 
    },
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/cart/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] }); 
    },
  });
}