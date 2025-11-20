import type { Product, Review } from "@/store/product/productTypes";
import type { AppDispatch, RootState } from "@/store/store";
import { StarIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { SubTitle } from "../ui/text";
import { deleteReview, postReview } from "@/store/product/productThunks";

interface Props {
  product: Product;
  productReviews: Review[];
}

const ReviewsContainer = ({ product, productReviews }: Props) => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { isPostingReview, isReviewDeleting } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      productId: product.id,
      review: {
        rating,
        comment,
      },
      authUser: authUser,
    };
    dispatch(postReview(data));
  };

  return (
    <Container className="mb-10">
      {/* --- FORM ĐÁNH GIÁ --- */}
      {authUser && (
        <form
          onSubmit={handleReviewsSubmit}
          className="mb-10 p-6 rounded-2xl border bg-white shadow-sm space-y-5"
        >
          <h4 className="text-xl font-semibold">Để lại đánh giá sản phẩm</h4>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <StarIcon
                    size={28}
                    className={`${
                      starValue <= (hoverRating || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Nội dung */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Viết trải nghiệm của bạn..."
            className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-shop_light_green outline-none"
          />

          <Button
            type="submit"
            className="bg-shop_dark_green hover:bg-shop_light_green text-white w-40"
            disabled={isPostingReview}
          >
            {isPostingReview ? (
              <div className="flex items-center space-x-2">
                <Spinner />
                <span>Đang gửi...</span>
              </div>
            ) : (
              "Gửi đánh giá"
            )}
          </Button>
        </form>
      )}

      {/* --- DANH SÁCH ĐÁNH GIÁ --- */}
      <SubTitle className="text-2xl mb-6">
        Đánh giá của khách hàng ({product.reviews?.length || 0})
      </SubTitle>

      {productReviews.length > 0 ? (
        <div className="space-y-6">
          {productReviews.map((review) => (
            <div
              key={review.review_id}
              className="p-5 bg-white rounded-2xl border shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <img
                  src={
                    review.reviewer?.avatar?.url ||
                    "https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                  }
                  alt={review.reviewer?.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />

                <div className="flex justify-between items-center w-full">
                  <div className="w-full">
                    {/* tên + rating */}
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="font-semibold text-lg">
                        {review.reviewer?.name}
                      </h4>
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon
                            key={index}
                            size={18}
                            className={`${
                              index < Number(review.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>

                  {/* Delete button */}
                  {authUser?.id === review.reviewer?.id && (
                    <Button
                      variant="destructive"
                      className="h-9 w-9 p-0 rounded-full flex items-center justify-center"
                      onClick={() =>
                        dispatch(
                          deleteReview({
                            productId: product.id,
                            reviewId: review.review_id,
                          })
                        )
                      }
                      disabled={isReviewDeleting}
                    >
                      {isReviewDeleting ? (
                        <Spinner className="scale-75" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
      )}
    </Container>
  );
};

export default ReviewsContainer;
