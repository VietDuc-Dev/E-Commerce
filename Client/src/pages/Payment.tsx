import type { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import type { PlaceOrder, ShippingInfo } from "@/store/order/orderTypes";
import { placeOrder } from "@/store/order/orderThunks";
import Container from "@/components/Container";
import { ArrowLeft, Check, MapPin, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import PriceFormatter from "@/components/PriceFormatter";
import { Separator } from "@/components/ui/separator";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "@/components/payment/PaymentForm";

const Payment = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState(authUser?.name || "");

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { orderStep } = useSelector((state: RootState) => state.order);
  const [isShippingDetail, setIsShippingDetail] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingInfo>({
    full_name: "",
    city: "",
    district: "",
    ward: "",
    addressDetail: "",
    phone: null,
  });

  let total = 0;

  total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // if total > 1tr => free ship
  const shipping = total >= 1000 ? 0 : 30;

  const totalCart = Math.round(total + total * 0.1 + shipping);

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: PlaceOrder = {
      full_name: name,
      city: shippingDetails.city,
      district: shippingDetails.district,
      ward: shippingDetails.ward,
      addressDetail: shippingDetails.addressDetail,
      phone: shippingDetails.phone,
      orderedItems: cart,
    };

    setIsShippingDetail(true);
    await dispatch(placeOrder(data));
    setIsShippingDetail(false);
  };

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto relative">
            {/* Header */}
            <div className="absolute">
              <Link to={"/cart"}>
                <button className="flex items-center space-x-2 hover:text-shop_light_green">
                  <ArrowLeft className="w-5 h-5" />{" "}
                  <span>Quay lại giỏi hàng</span>
                </button>
              </Link>
            </div>
            {/* Progress steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                {/* Step 1 */}
                <div
                  className={`flex items-center space-x-2 ${
                    orderStep >= 1 ? "text-shop_light_green" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      orderStep >= 1 ? "bg-shop_light_green text-white" : ""
                    }`}
                  >
                    <span>1</span>
                  </div>
                  <span className="font-bold">Chi tiết</span>
                </div>
                <div
                  className={`w-12 h-0.5 ${
                    orderStep >= 2 ? "bg-shop_light_green" : ""
                  }`}
                />

                {/* Step 2 */}
                <div
                  className={`flex items-center space-x-2 ${
                    orderStep >= 2 ? "text-shop_light_green" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      orderStep >= 2
                        ? "bg-shop_light_green text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {orderStep > 2 ? <Check className="w-5 h-5" /> : "2"}
                  </div>
                  <span className="font-bold">Thanh toán</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form order */}
              <div className="lg:col-span-2">
                <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                  {orderStep === 1 ? (
                    <form onSubmit={handlePlaceOrder}>
                      <FieldGroup>
                        <Field className="space-y-2 mb-8">
                          <FieldLabel className="text-lg font-semibold">
                            Thông tin giao hàng
                          </FieldLabel>

                          <div className="flex space-x-3">
                            <div className="space-y-2 flex-1">
                              <Label>Tên người nhận hàng *</Label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </span>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2 flex-1">
                              <Label>Số điện thoại *</Label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </span>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="..."
                                  onChange={(e) => {
                                    setShippingDetails({
                                      ...shippingDetails,
                                      phone: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <div className="space-y-2 flex-1">
                              <Label>Thành phố *</Label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </span>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="thành phố ..."
                                  onChange={(e) => {
                                    setShippingDetails({
                                      ...shippingDetails,
                                      city: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2 flex-1">
                              <Label>Quận *</Label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </span>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="quận ..."
                                  onChange={(e) => {
                                    setShippingDetails({
                                      ...shippingDetails,
                                      district: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <div className="space-y-2 flex-1">
                              <Label>Phường *</Label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </span>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="phường ..."
                                  onChange={(e) => {
                                    setShippingDetails({
                                      ...shippingDetails,
                                      ward: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2 flex-1">
                              <Label>Số nhà, đường *</Label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </span>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="số nhà, đường ..."
                                  onChange={(e) => {
                                    setShippingDetails({
                                      ...shippingDetails,
                                      addressDetail: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <Button
                            type="submit"
                            disabled={isShippingDetail}
                            className="bg-shop_dark_green hover:bg-shop_light_green text-white"
                          >
                            {isShippingDetail ? (
                              <div className="flex items-center space-x-2">
                                <Spinner />
                                <span>Đang cập nhật ...</span>
                              </div>
                            ) : (
                              "Xác nhận thanh toán"
                            )}
                          </Button>
                        </Field>
                      </FieldGroup>
                    </form>
                  ) : (
                    <>
                      <Elements stripe={stripePromise}>
                        <PaymentForm />
                      </Elements>
                    </>
                  )}
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
