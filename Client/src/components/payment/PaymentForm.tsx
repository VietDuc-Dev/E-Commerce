import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import { clearCart } from "@/store/cart/cartSlice";
import { toggleOrderStep } from "@/store/order/orderSlice";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const clientSecret = useSelector(
    (state: RootState) => state.order.paymentIntent
  );

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear error message when user starts typing
  useEffect(() => {
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.on("change", (event) => {
          if (event.error) {
            setErrorMessage(event.error.message);
          } else {
            setErrorMessage("");
          }
        });
      }
    }
  }, [elements]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrorMessage("");

    // Validate Stripe is loaded
    if (!stripe || !elements) {
      setErrorMessage("Stripe chưa được tải. Vui lòng thử lại.");
      return;
    }

    // Validate client secret exists
    if (!clientSecret) {
      setErrorMessage("Không tìm thấy thông tin thanh toán. Vui lòng thử lại.");
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setErrorMessage("Không tìm thấy thông tin thẻ.");
        setIsProcessing(false);
        return;
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        // Handle specific error types
        const errorMsg = error.message || "Thanh toán thất bại!";
        setErrorMessage(errorMsg);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        toast.success("Thanh toán thành công.");
        cardElement.clear();

        dispatch(clearCart());
        dispatch(toggleOrderStep());
        navigate("/", { replace: true });
      } else {
        // Handle unexpected payment status
        setErrorMessage("Trạng thái thanh toán không xác định.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage("Đã xảy ra lỗi trong quá trình thanh toán.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading state while Stripe is initializing
  if (!stripe || !elements) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
        <span className="ml-2">Đang tải form thanh toán...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Thông tin thẻ
        </label>
        <CardElement
          className="p-3 border rounded-lg bg-white focus-within:ring-2 focus-within:ring-shop_dark_green focus-within:border-transparent transition-all"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#ef4444",
              },
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        className="bg-shop_dark_green hover:bg-shop_light_green text-white"
        disabled={isProcessing || !stripe || !clientSecret}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <Spinner />
            <span>Đang xử lý...</span>
          </div>
        ) : (
          "Thanh toán"
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
