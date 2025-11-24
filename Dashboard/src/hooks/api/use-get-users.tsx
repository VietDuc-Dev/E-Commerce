import { getAllUserQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const query = useQuery({
    queryKey: ["all-user"],
    queryFn: () => getAllUserQueryFn(),
    staleTime: Infinity,
  });
  return query;
};

export default useGetAllUsers;
