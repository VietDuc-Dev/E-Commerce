import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { toggleAuthPopup } from "@/store/popup/popupSlice";

const LoginButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(toggleAuthPopup())}
      className="rounded-full bg-shop_dark_green hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect"
    >
      Đăng nhập
    </Button>
  );
};

export default LoginButton;
