import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordMutationFn } from "@/lib/api";
import { responseError } from "@/lib/handleError";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";

export default function UserUpdatePasswordCard() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: updatePasswordMutationFn,
  });

  const formSchema = z
    .object({
      currentPassword: z.string().trim().min(1, {
        message: "Mật khẩu còn thiếu",
      }),
      newPassword: z.string().trim().min(1, {
        message: "Mật khẩu còn thiếu",
      }),
      confirmNewPassword: z.string().trim().min(1, {
        message: "Xác nhận mật khẩu còn thiếu",
      }),
    })
    .refine((val) => val.newPassword === val.confirmNewPassword, {
      message: "Mật khẩu không khớp",
      path: ["confirmNewPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onsubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    mutate(values, {
      onSuccess(data) {
        toast.success(data.message);
        form.reset();
      },
      onError(error) {
        const message = responseError(error);
        console.log("error", error);
        toast.error(message);
      },
    });
  };
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Đổi mật khẩu
          </h4>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onsubmit)}
              className="flex flex-col"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 ">
                <div>
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Mật khẩu hiện tại</Label>
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Mật khẩu mới</Label>
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Xác nhận mật khẩu</Label>
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeOff className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                    <span className="ml-2">
                      {showPassword ? "Ẩn" : "Xem"} mật khẩu
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm">Lưu thay đổi</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
