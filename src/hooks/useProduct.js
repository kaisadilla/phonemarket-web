import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/product";

export default function useProduct (id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}