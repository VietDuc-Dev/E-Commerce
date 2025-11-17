import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import PriceView from "@/components/PriceView";
import ImageView from "@/components/products/ImageView";
import { fetchProductDetails } from "@/store/product/productThunks";
import type { AppDispatch, RootState } from "@/store/store";
import {
  CornerDownLeft,
  Layers2,
  MessageCircleQuestionMark,
  Share2,
  StarIcon,
  Truck,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { productDetails, loading, productReviews } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (!productDetails) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div>
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {productDetails?.images && (
          <ImageView
            images={productDetails?.images}
            // isStock={productDetails?.stock}
          />
        )}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{productDetails?.name}</h2>
            <p className="text-sm text-gray-600 tracking-wide">
              {productDetails?.description}
            </p>
            <div className="flex items-center gap-0.5 text-xs">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  size={13}
                  key={index}
                  className={
                    index < Math.floor(productDetails.ratings)
                      ? "text-shop_light_green"
                      : " text-lightText"
                  }
                  fill={
                    index < Math.floor(productDetails.ratings)
                      ? "#93D991"
                      : "#ababab"
                  }
                />
              ))}
              <p className="font-semibold ml-2">
                {productDetails.review_count || 0} đánh giá
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-b border-gray-200 py-5 flex justify-between">
            <div className="flex items-center space-x-3">
              <span>Giá sản phẩm</span>
              <PriceView
                price={productDetails?.price}
                className="text-lg font-bold"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <p className="font-medium">Sản phẩm còn lại</p>
              <p
                className={`${
                  productDetails?.stock === 3
                    ? "text-red-600"
                    : "text-shop_dark_green/80 font-semibold"
                }`}
              >
                {(productDetails?.stock as number) > 0
                  ? productDetails?.stock
                  : "hết hàng"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 lg:gap-3">
            <AddToCartButton product={productDetails} />
            <FavoriteButton showProduct={true} />
          </div>
          {/* <ProductCharacteristics product={product} /> */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <Layers2 className="text-lg" />
              <p>So sánh sảm phẩm</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <MessageCircleQuestionMark className="text-lg" />
              <p>Đặt câu hỏi</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <Truck className="text-lg" />
              <p>Giao và hoàn hàng</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
              <Share2 className="text-lg" />
              <p>Chia sẽ</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
              <Truck size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Miễn phí giao hàng
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  Nhập mã bưu chính của bạn để biết tình trạng sẵn sàng giao
                  hàng.
                </p>
              </div>
            </div>
            <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
              <CornerDownLeft size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Hoàn trả sản phẩm
                </p>
                <p className="text-sm text-gray-500 ">
                  Trả lại hàng miễn phí trong 30 ngày.{" "}
                  <span className="underline underline-offset-2">Chi tiết</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
