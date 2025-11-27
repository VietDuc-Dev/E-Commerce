import { getProductsQueryFn } from "@/lib/api";
import { AllProductPayloadType } from "@/types/api.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useProductsQuery = ({
  availability,
  price,
  category,
  ratings,
  search,
  page,
  skip = false,
}: AllProductPayloadType) => {
  const query = useQuery({
    queryKey: [
      "all-products",
      availability,
      price,
      category,
      ratings,
      search,
      page,
    ],
    queryFn: () =>
      getProductsQueryFn({
        availability,
        price,
        category,
        ratings,
        search,
        page,
      }),
    staleTime: Infinity,
    placeholderData: skip ? undefined : keepPreviousData,
    enabled: !skip,
  });
  return query;
};

export default useProductsQuery;
