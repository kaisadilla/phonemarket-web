import { useQuery } from "@tanstack/react-query";
import { fetchProductList } from "../api/product";

export default function useProductList () {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProductList,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}