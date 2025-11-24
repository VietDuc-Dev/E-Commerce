import { MoreHorizontalIcon, Trash2, UserCog } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserMutationFn } from "@/lib/api";
import { toast } from "react-toastify";
import { responseError } from "@/lib/handleError";
import { UserType } from "@/types/api.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  user: UserType;
}

export default function ActionUser({ user }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUserMutationFn,
  });

  const handleDeleteUser = (userId: string) => {
    if (isPending) return;

    mutate(userId, {
      onSuccess(data) {
        queryClient.invalidateQueries({
          queryKey: ["all-user"],
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
            <DropdownMenuItem>
              <UserCog size={18} />
              Phân quyền
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-medium group hover:bg-gray-100 hover:text-gray-700 dark:text-red-400 dark:hover:bg-white/5 dark:hover:text-gray-300 text-red-700 text-xs"
              onClick={() => handleDeleteUser(user.id)}
            >
              <Trash2 size={18} />
              Xóa tài khoản
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
