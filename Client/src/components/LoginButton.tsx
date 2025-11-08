import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup } from "@/store/popup/popupSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { User } from "lucide-react";

const LoginButton = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      {!authUser ? (
        <Button
          onClick={() => dispatch(toggleAuthPopup())}
          className="rounded-full bg-shop_dark_green hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect"
        >
          Đăng nhập
        </Button>
      ) : (
        <button onClick={() => dispatch(toggleAuthPopup())}>
          <User />
        </button>
      )}
    </div>
  );
};

export default LoginButton;
