import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "./ui/input";
import { FaGoogle } from "react-icons/fa";

const LoginButton = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-shop_dark_green hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect">
            Đăng nhập
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form className="flex flex-col gap-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Đăng nhập tài khoản</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Nhập email và mật khẩu để đăng nhập tài khoản của bạn
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="shopconnect@gmail.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Bạn quên mật khẩu?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="bg-shop_dark_green hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect"
                >
                  Đăng nhập
                </Button>
              </Field>
              <FieldSeparator>Hoặc đăng nhập bằng</FieldSeparator>
              <Field>
                <Button variant="outline" type="button">
                  <FaGoogle />
                  Đăng nhập với Google
                </Button>
                <FieldDescription className="text-center">
                  Bạn chưa có tài khoản?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Đăng ký
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default LoginButton;
