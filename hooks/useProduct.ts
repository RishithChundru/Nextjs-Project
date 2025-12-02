import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export function useProduct(id?: string | null) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null; 
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}