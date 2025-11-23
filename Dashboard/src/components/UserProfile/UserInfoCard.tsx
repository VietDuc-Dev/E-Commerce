import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { UserType } from "@/types/api.type";
import DateVN from "@/lib/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileMutationFn } from "@/lib/api";
import { responseError } from "@/lib/handleError";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Loader } from "lucide-react";
import { fileSchema } from "@/schema";

interface Props {
  user: UserType;
}

export default function UserInfoCard({ user }: Props) {
  const { isOpen, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileMutationFn,
  });

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Bạn chưa nhập tên",
    }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: "Bạn chưa điền email",
      })
      .email("Email không đúng"),
    avatar: fileSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      avatar: undefined,
    },
  });

  const handleSave = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);

    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }

    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        // Invalidate và refetch user data
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        closeModal();
      },
      onError(error) {
        const message = responseError(error);
        console.log("error", error);
        toast.error(message);
      },
    });
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Thông tin cá nhân
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Họ tên
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Địa chỉ Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Số điện thoại
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                +09 363 398 46
              </p>
            </div>

            <div className="col-span-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Ngày đăng ký
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                <DateVN value={user.created_at} />
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Cập nhật
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cập nhật thông tin cá nhân
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7"></p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col"
            >
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div className="">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2 flex w-full justify-center">
                      <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 ">
                        <img
                          src={
                            user?.avatar?.url ||
                            "https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                          }
                          alt="user"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Họ tên</Label>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="shop connect"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Địa chỉ email</Label>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="shopconnect@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Ảnh đại diện</Label>
                            <FormControl>
                              <Input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  field.onChange(file);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={closeModal}
                  disabled={isPending}
                >
                  Đóng
                </Button>
                <Button size="sm">
                  {isPending && <Loader className="animate-spin" />} Lưu thay
                  đổi
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
