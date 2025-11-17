import Container from "@/components/Container";
import PriceFormatter from "@/components/PriceFormatter";
import CartEmpty from "@/components/cart/CartEmpty";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Title } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { removeFromCart } from "@/store/cart/cartSlice";
import { toggleAuthPopup } from "@/store/popup/popupSlice";
import type { RootState } from "@/store/store";
import { ShoppingBag, Trash, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { authUser } = useSelector((state: RootState) => state.auth);

  let total = 0;

  total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // if total > 1tr => free ship
  const shipping = total >= 1000000 ? 0 : 30000;

  const totalCart = Math.round(total + total * 0.1 + shipping);

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>
        {cart?.length ? (
          <>
            <div className="flex items-center gap-2 py-5">
              <ShoppingBag className="text-darkColor" />
              <Title>Giỏ hàng</Title>
            </div>
            <div className="grid lg:grid-cols-3 md:gap-8">
              <div className="lg:col-span-2 rounded-lg">
                <div className="border bg-white rounded-md">
                  {cart?.map(({ product, quantity }) => {
                    return (
                      <div
                        key={product?.id}
                        className="border-b p-2.5 last:border-b-0 flex
                      items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                          {product?.images && (
                            <Link
                              to={`/product/${product?.id}`}
                              className="border p-0.5 md:p-1 mr-2 rounded-md
                                 overflow-hidden group"
                            >
                              <img
                                src={product?.images[0]?.url}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                              />
                            </Link>
                          )}
                          <div className="h-full flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                              <h2 className="text-base font-semibold line-clamp-1">
                                {product?.name}
                              </h2>
                              <p className="text-sm capitalize">
                                Loại:{" "}
                                <span className="font-semibold">
                                  {product?.category}
                                </span>
                              </p>
                              <p className="text-sm capitalize">
                                Mô tả:{" "}
                                <span className="font-semibold">
                                  {product?.description}
                                </span>
                              </p>
                              <p className="text-sm capitalize">
                                Giá sản phẩm:{" "}
                                <span className="font-semibold">
                                  <PriceFormatter amount={product?.price} />
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Heart className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-green-600 hoverEffect" />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold">
                                    Thêm vào mục yêu thích
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() =>
                                        dispatch(
                                          removeFromCart({ id: product?.id })
                                        )
                                      }
                                      className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600">
                                    Xóa sản phẩm
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                          <PriceFormatter
                            amount={(product?.price as number) * quantity}
                            className="font-bold text-lg"
                          />
                          <QuantityButtons
                            product={product}
                            quantity={quantity}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">
                      Tổng đơn hàng
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Tổng tiền</span>
                        <PriceFormatter amount={total} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Thuế</span>
                        <PriceFormatter amount={total * 0.1} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Phí vận chuyển</span>
                        <PriceFormatter amount={shipping} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Thanh toán</span>
                        <PriceFormatter
                          className="text-lg font-bold text-black"
                          amount={totalCart}
                        />
                      </div>
                      {authUser ? (
                        <Link to={"/payment"}>
                          <Button
                            className="bg-shop_dark_green/90 text-white/90 hover:text-white hover:bg-shop_dark_green w-full rounded-full font-semibold tracking-wide hoverEffect"
                            size="lg"
                          >
                            Tiến hành thanh toán
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          onClick={() => dispatch(toggleAuthPopup())}
                          className="bg-shop_dark_green/90 text-white/90 hover:text-white hover:bg-shop_dark_green w-full rounded-full font-semibold tracking-wide hoverEffect"
                          size="lg"
                        >
                          Tiến hành thanh toán
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <CartEmpty />
        )}
      </Container>
    </div>
  );
};

export default CartPage;
