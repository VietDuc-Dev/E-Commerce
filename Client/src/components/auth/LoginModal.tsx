import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Spinner } from "@/components/ui/spinner";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { AuthModeEnum, type AuthModeEnumType } from "@/constant";
import type { FormDataType } from "@/store/auth/authTypes";
import { toggleAuthPopup } from "@/store/popup/popupSlice";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "@/store/auth/authThunks";
import { Lock, Mail, User } from "lucide-react";

const LoginModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { authUser, isSigningUp, isLoggingIn, isRequestingForToken } =
    useSelector((state: RootState) => state.auth);

  const { isAuthPopupOpen } = useSelector((state: RootState) => state.popup);

  const [mode, setMode] = useState<AuthModeEnumType>(AuthModeEnum.signin);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isSigninOrSignup =
    mode === AuthModeEnum.signin || mode === AuthModeEnum.signup;

  useEffect(() => {
    if (location.pathname.startsWith("/password/reset/")) {
      setMode(AuthModeEnum.reset);
      dispatch(toggleAuthPopup());
    }
  }, [location.pathname, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    data.append("email", formData.email);
    data.append("password", formData.password);
    if (mode === AuthModeEnum.signup) data.append("name", formData.name);

    if (mode === AuthModeEnum.forgot) {
      dispatch(forgotPassword(formData.email)).then(() => {
        dispatch(toggleAuthPopup());
        setMode(AuthModeEnum.signin);
      });
      return;
    }

    if (mode === AuthModeEnum.reset) {
      const token = location.pathname.split("/").pop();
      const dataResetPassword = {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      dispatch(resetPassword({ token, data: dataResetPassword }));
      return;
    }

    if (mode === AuthModeEnum.signup) {
      const dataSignup = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      dispatch(register(dataSignup));
    } else {
      const dataLogin = {
        email: formData.email,
        password: formData.password,
      };
      dispatch(login(dataLogin));
    }

    if (authUser) {
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  const handleClose = () => dispatch(toggleAuthPopup());

  if (!isAuthPopupOpen || authUser) return null;

  const isLoading = [isSigningUp, isLoggingIn, isRequestingForToken].some(
    Boolean
  );

  return (
    <Dialog open={isAuthPopupOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {mode === AuthModeEnum.reset
              ? "Đỗi mật khẩu"
              : mode === AuthModeEnum.signup
              ? "Đăng ký tài khoản"
              : mode === AuthModeEnum.signin
              ? "Đăng nhập tài khoản"
              : "Chào mừng đến với Shop Connect"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground flex justify-center">
            {mode === AuthModeEnum.reset
              ? "Bạn cần đặt mật khẩu có độ phức tạp cao để bảo mật hơn"
              : mode === AuthModeEnum.signup
              ? "Chào mừng bạn đến với ShopConnect"
              : mode === AuthModeEnum.signin
              ? "Chúc mừng bạn đã quay trở lại với ShopConnect"
              : "Bạn cần nhập email đã đăng ký để đổi mật khẩu mới"}
          </p>
        </DialogHeader>

        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <FieldGroup>
            {mode === AuthModeEnum.signup && (
              <Field>
                <FieldLabel>Tên tài khoản</FieldLabel>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </span>
                  <Input
                    type="text"
                    placeholder="shop connect"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    required
                  />
                </div>
              </Field>
            )}

            {mode !== AuthModeEnum.reset && (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </span>
                  <Input
                    type="email"
                    placeholder="shopconnect@gmail.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    required
                  />
                </div>
              </Field>
            )}

            {mode !== AuthModeEnum.forgot && (
              <Field>
                <div className="flex items-center w-full">
                  <FieldLabel>Mật khẩu</FieldLabel>
                  {mode === AuthModeEnum.signin && (
                    <button
                      type="button"
                      className="ml-auto text-xs underline-offset-4 hover:underline"
                      onClick={() => setMode(AuthModeEnum.forgot)}
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </span>
                  <Input
                    type="password"
                    placeholder="********"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                    required
                  />
                </div>
              </Field>
            )}

            {mode === AuthModeEnum.reset && (
              <Field>
                <FieldLabel>Xác nhận mật khẩu</FieldLabel>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </span>
                  <Input
                    type="password"
                    placeholder="********"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </Field>
            )}

            <Field>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-shop_dark_green hover:bg-shop_light_green text-white"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Spinner />
                    <span>
                      {mode === AuthModeEnum.reset
                        ? "Đang đổi mật khẩu ..."
                        : mode === AuthModeEnum.signup
                        ? "Đang tạo tài khoản ..."
                        : mode === AuthModeEnum.forgot
                        ? "Đang gửi email ..."
                        : "Đang đăng nhập ..."}
                    </span>
                  </div>
                ) : mode === AuthModeEnum.reset ? (
                  "Đổi mật khẩu"
                ) : mode === AuthModeEnum.signup ? (
                  "Tạo tài khoản"
                ) : mode === AuthModeEnum.forgot ? (
                  "Gửi email đổi mật khẩu"
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </Field>

            <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>

            <Field>
              <Button variant="outline" type="button">
                <FaGoogle />
                Đăng nhập với Google
              </Button>

              {isSigninOrSignup && (
                <FieldDescription className="text-center mt-3">
                  {mode === AuthModeEnum.signin
                    ? "Bạn chưa có tài khoản?"
                    : "Bạn đã có tài khoản"}{" "}
                  <button
                    type="button"
                    className="underline"
                    onClick={() => {
                      setMode((prev) =>
                        prev === AuthModeEnum.signup
                          ? AuthModeEnum.signin
                          : AuthModeEnum.signup
                      );
                    }}
                  >
                    {mode === AuthModeEnum.signin ? "Đăng ký" : "Đăng nhập"}
                  </button>
                </FieldDescription>
              )}

              {mode === AuthModeEnum.forgot && (
                <FieldDescription className="text-center mt-3">
                  Quay lại đăng nhập!{" "}
                  <button
                    type="button"
                    className="underline"
                    onClick={() => {
                      setMode(AuthModeEnum.signin);
                    }}
                  >
                    Đăng nhập
                  </button>
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
