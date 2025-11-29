import {
  MessageCircleMore,
  MoreHorizontalIcon,
  Trash2,
  UserCog,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductMutationFn } from "@/lib/api";
import { toast } from "react-toastify";
import { responseError } from "@/lib/handleError";
import { Product } from "@/types/api.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useModal } from "@/context/ModalContext";

interface Props {
  product: Product;
}

export default function ActionProduct({ product }: Props) {
  const queryClient = useQueryClient();
  const { openModalUpdateProduct, openModalReviewsProduct } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProductMutationFn,
  });

  const handleDeleteUser = (userId: string) => {
    if (isPending) return;

    mutate(userId, {
      onSuccess(data) {
        queryClient.invalidateQueries({
          queryKey: ["all-products"],
        });
        toast.success(data.message);
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
            aria-label="Open menu"
          >
            <MoreHorizontalIcon size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => openModalUpdateProduct(product)}>
              <UserCog size={18} />
              Cập nhật
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openModalReviewsProduct(product.id)}
            >
              <MessageCircleMore size={18} />
              Xem đánh giá
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-medium group hover:bg-gray-100 hover:text-gray-700 dark:text-red-400 dark:hover:bg-white/5 dark:hover:text-gray-300 text-red-700 text-xs"
              onClick={() => handleDeleteUser(product.id)}
            >
              <Trash2 size={18} />
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
