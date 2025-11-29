import { useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductMutationFn } from "@/lib/api";
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
import { useModal } from "@/context/ModalContext";
import Select from "../form/Select";
import { Category } from "@/constant/data";
import TextArea from "../form/input/TextArea";

export default function UpdateProductModal() {
  const { isModalUpdateProduct, product, closeModalUpdateProduct } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProductMutationFn,
  });

  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Bạn chưa nhập đủ thông tin" })
      .max(255, { message: "Tên sản phẩm quá dài" }),
    description: z
      .string()
      .trim()
      .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" })
      .max(2000, { message: "Mô tả quá dài" }),
    price: z
      .number({
        message: "Bạn chưa nhập đủ thông tin",
      })
      .positive({ message: "Giá phải là số dương" })
      .max(999999999, { message: "Giá quá lớn" }),
    category: z
      .string()
      .trim()
      .min(1, { message: "Vui lòng chọn loại sản phẩm" }),
    stock: z
      .number({
        message: "Bạn chưa nhập đủ thông tin",
      })
      .int({ message: "Số lượng phải là số nguyên" })
      .nonnegative({ message: "Số lượng không được âm" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: Number(product.price * 1000),
        category: product.category,
        stock: product.stock,
      });
    }
  }, [product, form]);

  const handleSave = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price / 1000));
    formData.append("category", values.category);
    formData.append("stock", String(values.stock));

    const data = {
      data: formData,
      id: product?.id,
    };

    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["all-products"] });
        closeModalUpdateProduct();
      },
      onError(error) {
        toast.error(responseError(error));
      },
    });
  };

  if (!product) return null;

  return (
    <Modal
      isOpen={isModalUpdateProduct}
      onClose={closeModalUpdateProduct}
      className="max-w-[800px] m-4"
    >
      <div className="w-full max-w-[800px] bg-white p-4 rounded-3xl dark:bg-gray-900 lg:p-11">
        <h4 className="text-2xl font-semibold mb-4">Cập nhật sản phẩm</h4>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
            <fieldset
              disabled={isPending}
              className="grid grid-cols-1 gap-6 xl:grid-cols-2"
            >
              {/* LEFT */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tên sản phẩm *</Label>
                      <FormControl>
                        <Input placeholder="Tên sản phẩm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Mô tả *</Label>
                      <FormControl>
                        <TextArea
                          rows={6}
                          placeholder="Mô tả sản phẩm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Giá (VNĐ) *</Label>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Số lượng *</Label>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* RIGHT */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Loại *</Label>
                      <FormControl>
                        <Select
                          {...field}
                          options={Category}
                          defaultValue={product.category || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {product.images && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        className="h-28 w-32 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </fieldset>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={closeModalUpdateProduct}
                disabled={isPending}
              >
                Đóng
              </Button>
              <Button>
                {isPending && <Loader className="animate-spin" />} Lưu thay đổi
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
