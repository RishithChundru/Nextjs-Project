import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data;
    },
  });
}