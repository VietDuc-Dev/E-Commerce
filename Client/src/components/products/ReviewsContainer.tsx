import type { Product, Review } from "@/store/product/productTypes";
import type { AppDispatch, RootState } from "@/store/store";
import { StarIcon } from "lucide-react";
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
    <Container className="mb-5">
      {authUser && (
        <form onSubmit={handleReviewsSubmit} className="mb-8 space-y-4">
          <h4 className="text-lg font-semibold">Để lại đánh giá</h4>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={`text-2xl ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <StarIcon />
                </button>
              );
            })}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Viết đánh giá của bạn ở đây ..."
            className="w-full p-3 rounded-md border"
          />
          <Button
            type="submit"
            className="bg-shop_dark_green hover:bg-shop_light_green text-white"
            disabled={isPostingReview}
          >
            {isPostingReview ? (
              <div className="flex items-center space-x-2">
                <Spinner />
                <span>Đang gửi ...</span>
              </div>
            ) : (
              "Gửi"
            )}
          </Button>
        </form>
      )}
      <SubTitle className="text-2xl mb-4">
        Đánh giá của khách hàng ({product.reviews?.length || 0})
      </SubTitle>
      {productReviews && productReviews.length > 0 ? (
        <div className="space-y-6">
          {productReviews.map((review) => {
            return (
              <div key={review.review_id} className="border rounded-2xl p-3">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      review.reviewer?.avatar?.url ||
                      "https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                    }
                    alt={review.reviewer?.name}
                    className="w-12 h-12 rounded-full text-foreground"
                  />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="flex items-center space-x-4 mb-2">
                        <h4 className="font-semibold text-foreground">
                          {review?.reviewer?.name}
                        </h4>
                        <div className="flex">
                          {[...Array(5)].map((_, index) => {
                            return (
                              <StarIcon
                                key={index}
                                className={`text-2xl ${
                                  index < Math.floor(Number(review.rating))
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            );
                          })}
                        </div>
                        {/* <span className="text-muted-foreground text-sm">
                          Ngày: 12/2/2025{}
                        </span> */}
                      </div>
                      <p className="text-muted-foreground mb-2">
                        {review.comment}
                      </p>
                    </div>

                    {authUser?.id === review.reviewer?.id && (
                      <Button
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
                          <div className="flex items-center space-x-2">
                            <Spinner />
                            <span>Đang xóa ...</span>
                          </div>
                        ) : (
                          "Xóa"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};

export default ReviewsContainer;
