import { getDashboardQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetDashboard = () => {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardQueryFn(),
    staleTime: Infinity,
  });
  return query;
};

export default useGetDashboard;
