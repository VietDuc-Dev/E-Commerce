import { getAllOrderQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllOrder = () => {
  const query = useQuery({
    queryKey: ["all-order"],
    queryFn: () => getAllOrderQueryFn(),
    staleTime: Infinity,
  });
  return query;
};

export default useGetAllOrder;
