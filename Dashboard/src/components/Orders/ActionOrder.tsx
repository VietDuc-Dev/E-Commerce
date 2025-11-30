import { MessageCircleMore, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderMutationFn } from "@/lib/api";
import { toast } from "react-toastify";
import { responseError } from "@/lib/handleError";
import { Orders } from "@/types/api.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useModal } from "@/context/ModalContext";

interface Props {
  order: Orders;
}

export default function ActionOrder({ order }: Props) {
  const queryClient = useQueryClient();
  const { openModalUpdateProduct, openModalReviewsProduct } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteOrderMutationFn,
  });

  const handleDeleteOrder = (orderId: string) => {
    if (isPending) return;

    mutate(orderId, {
      onSuccess(data) {
        queryClient.invalidateQueries({
          queryKey: ["all-order"],
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
            <DropdownMenuItem onClick={() => openModalReviewsProduct(order.id)}>
              <MessageCircleMore size={18} />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-medium group hover:bg-gray-100 hover:text-gray-700 dark:text-red-400 dark:hover:bg-white/5 dark:hover:text-gray-300 text-red-700 text-xs"
              onClick={() => handleDeleteOrder(order.id)}
            >
              <Trash2 size={18} />
              Xóa đơn hàng
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
