import { logout, updatePassword, updateProfile } from "@/store/auth/authThunks";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup } from "@/store/popup/popupSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

const ProfilePhanel = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthPopupOpen } = useSelector((state: RootState) => state.popup);
  const { authUser, isUpdatingProfile, isUpdatingPassword } = useSelector(
    (state: RootState) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState(authUser?.name || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (authUser) {
      setName(authUser?.name || "");
      setEmail(authUser?.email || "");
    }
  }, [authUser]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");

  const [isLogout, setIsLogout] = useState(false);

  const handleLogout = () => {
    setIsLogout(true);
    dispatch(logout());
    setIsLogout(false);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (avatar) {
      const data = {
        name: name,
        email: email,
        avatar: avatar,
      };

      dispatch(updateProfile(data));
    } else {
      const data = {
        name: name,
        email: email,
      };

      dispatch(updateProfile(data));
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    dispatch(updatePassword(data));
  };

  const handleClose = () => dispatch(toggleAuthPopup());

  if (!isAuthPopupOpen || !authUser) return null;

  return (
    <>
      <Sheet open={isAuthPopupOpen} onOpenChange={handleClose}>
        <SheetContent side="right" className="w-1/4 min-w-[350px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Thông tin của bạn</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center mb-6">
              <img
                src={
                  authUser?.avatar?.url ||
                  "https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                }
                alt={authUser?.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-2 object-cover"
              />
              <h3 className="text-lg font-semibold text-foreground">
                {authUser?.name}
              </h3>
              <p className="text-muted-foreground">{authUser?.email}</p>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <FieldGroup>
                <Field className="space-y-2 mb-8">
                  <FieldLabel className="text-lg font-semibold">
                    Cập nhật thông tin
                  </FieldLabel>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </span>
                    <Input
                      type="text"
                      placeholder="shop connect"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </span>
                    <Input
                      type="email"
                      placeholder="shopconnect@gmail.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="avatar">Thay đổi ảnh đại diện</Label>
                    <Input
                      id="avatar"
                      type="file"
                      onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="bg-shop_dark_green hover:bg-shop_light_green text-white"
                  >
                    {isUpdatingProfile ? (
                      <div className="flex items-center space-x-2">
                        <Spinner />
                        <span>Đang cập nhật ...</span>
                      </div>
                    ) : (
                      "Lưu thay đổi"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            <form onSubmit={handleUpdatePassword}>
              <FieldGroup>
                <Field className="space-y-2 mb-8">
                  <FieldLabel className="text-lg font-semibold">
                    Thay đổi mật khẩu
                  </FieldLabel>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu hiện tại"
                      className="pl-10"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu mới"
                      className="pl-10"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Xác nhận mật khẩu"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPasword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="flex text-xs text-muted-foreground items-center gap-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                    {showPassword ? "Ẩn" : "Xem"} mật khẩu
                  </button>

                  <Button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="bg-shop_dark_green hover:bg-shop_light_green text-white"
                  >
                    {isUpdatingPassword ? (
                      <div className="flex items-center space-x-2">
                        <Spinner />
                        <span>Đang cập nhật ...</span>
                      </div>
                    ) : (
                      "Lưu thay đổi"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            <Button
              onClick={handleLogout}
              disabled={isLogout}
              className="w-full bg-shop_dark_green hover:bg-shop_light_green text-white"
            >
              {isLogout ? (
                <div className="flex items-center space-x-2">
                  <Spinner />
                  <span>Đang đăng xuất ...</span>
                </div>
              ) : (
                "Đăng xuất"
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfilePhanel;
