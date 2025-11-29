import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { createProductMutationFn } from "@/lib/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { responseError } from "@/lib/handleError";
import ComponentCard from "../common/ComponentCard";
import TextArea from "../form/input/TextArea";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import { Category } from "@/constant/data";
import { useState } from "react";
import { imagesSchema } from "@/schema";

export default function CreateProductForm() {
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: createProductMutationFn,
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
    images: imagesSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      images: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price / 1000));
    formData.append("category", values.category);
    formData.append("stock", String(values.stock));
    values.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        form.reset({
          name: "",
          description: "",
          price: 0,
          category: "",
          stock: 0,
          images: [],
        });
        setImagePreview([]);
      },
      onError: (error) => {
        const message = responseError(error);
        console.error("Create product error:", error);
        toast.error(message);
      },
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, "images">
  ) => {
    const files = Array.from(e.target.files || []);

    field.onChange(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  return (
    <ComponentCard title="Điền các thông tin về sản phẩm của bạn ở đây">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Form Left */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Tên sản phẩm <span className="text-error-500">*</span>
                    </Label>
                    <FormControl>
                      <Input placeholder="Nhập tên sản phẩm" {...field} />
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
                    <Label>
                      Mô tả <span className="text-error-500">*</span>
                    </Label>
                    <FormControl>
                      <TextArea
                        rows={6}
                        placeholder="Nhập mô tả sản phẩm"
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
                    <Label>
                      Giá sản phẩm (VNĐ){" "}
                      <span className="text-error-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100.000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value || ""}
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
                    <Label>
                      Số lượng <span className="text-error-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="50"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Right */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Loại sản phẩm <span className="text-error-500">*</span>
                    </Label>
                    <FormControl>
                      <Select
                        options={Category}
                        placeholder="Chọn loại sản phẩm"
                        {...field}
                        className="dark:bg-dark-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Hình ảnh <span className="text-error-500">*</span>
                    </Label>
                    <FormControl>
                      <FileInput
                        className="custom-class"
                        multiple
                        onChange={(e) => handleImageChange(e, field)}
                      />
                    </FormControl>

                    {imagePreview && (
                      <div className="grid grid-cols-4 gap-2">
                        {imagePreview.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            className="h-28 w-32 object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" size="sm" disabled={isPending}>
                {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Đang xử lý..." : "Thêm mới"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ComponentCard>
  );
}
