import { useModal } from "@/context/ModalContext";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useQuery } from "@tanstack/react-query";
import { getSingleProductQueryFn } from "@/lib/api";
import { StarIcon } from "lucide-react";

export default function ReviewsProductModal() {
  const { isModalReviewsProduct, closeModalReviewsProduct, productId } =
    useModal();

  const { data, isLoading } = useQuery({
    queryKey: ["single-product", productId],
    queryFn: () => getSingleProductQueryFn(productId as string),
    enabled: !!productId,
  });

  if (!productId) return null;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Modal
      isOpen={isModalReviewsProduct}
      onClose={closeModalReviewsProduct}
      className="max-w-[800px] m-4"
    >
      <div className="w-full max-w-[800px] bg-white p-4 rounded-3xl dark:bg-gray-900 lg:p-11">
        <h4 className="text-2xl font-semibold mb-4">Bài đánh giá sản phẩm</h4>

        {data?.product?.reviews?.length === 0 && (
          <div className="p-6 text-center bg-gray-50 rounded-xl dark:bg-gray-800">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-200">
              Chưa có bài đánh giá nào.
            </p>
          </div>
        )}

        {data?.product?.reviews?.map((item) => (
          <div
            key={item.review_id}
            className="p-6 mb-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <img
                src={item.reviewer.avatar?.url}
                alt={item.reviewer.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 shadow"
              />

              {/* Content */}
              <div className="flex-1 space-y-2">
                {/* Name & Rating */}
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {item.reviewer.name}
                  </h3>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        size={16}
                        key={index}
                        className={
                          index < Math.floor(Number(item.rating))
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-500"
                        }
                        fill={
                          index < Math.floor(Number(item.rating))
                            ? "#facc15"
                            : "#9ca3af"
                        }
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                      {item.rating}/5
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px] italic border-l-4 pl-4 border-green-400">
                  "{item.comment}"
                </p>

                {/* Date */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Ngày đánh giá:{" "}
                  {/* {new Date(item.createdAt).toLocaleDateString("vi-VN")} */}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Button */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={closeModalReviewsProduct}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
}
