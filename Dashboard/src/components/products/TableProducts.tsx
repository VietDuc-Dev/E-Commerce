import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import DateVN from "@/lib/date";
import { Download, Loader, Plus } from "lucide-react";
import Button from "../ui/button/Button";
import ActionProduct from "./ActionProduct";
import useProductsQuery from "@/hooks/api/use-get-products";
import { Product } from "@/types/api.type";
import PriceFormatter from "@/lib/price";

export default function TableProducts() {
  const { data, isPending } = useProductsQuery({ page: 1 });

  const products: Product[] = data?.products || [];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {isPending ? (
          <Loader className="w-8 h-8 animate-spin place-self-center flex" />
        ) : null}

        <div className="min-w-[1102px]">
          {/* Table Header */}
          <div className="border-b border-gray-100 dark:border-white/[0.05]">
            <div className="flex justify-between items-center px-6 py-5">
              <div>
                <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                  Danh sách sản phẩm
                </h3>
                <span className="text-muted-foreground text-sm">
                  Theo dõi tiến trình của cửa hàng để tăng doanh số bán hàng của
                  bạn.
                </span>
              </div>

              <div className="flex space-x-4 h-11">
                <Button variant="outline">
                  Xuất file
                  <Download />
                </Button>
                <Button>
                  <Plus /> Thêm sản phẩm
                </Button>
              </div>
            </div>
          </div>
          {/* Header filter */}
          <div className="border-b border-gray-100 dark:border-white/[0.05]">
            <div className="hidden lg:block px-6 py-5">
              <form>
                <div className="relative">
                  <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                    <svg
                      className="fill-gray-500 dark:fill-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                        fill=""
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search ..."
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                  />
                </div>
              </form>
            </div>
          </div>
          <Table>
            {/* Header Title */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Sản phẩm
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Loại
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Giá
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tồn kho
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ngày tạo
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {" "}
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-15 h-16 overflow-hidden rounded-md">
                        <img
                          width={40}
                          height={40}
                          src={
                            item?.images[0].url ||
                            "https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                          }
                          alt={item.name}
                          className="w-15 h-16 mx-auto mb-4 border-2 object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400 truncate max-w-60">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.category}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <PriceFormatter amount={item.price} />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      // color={
                      //   order.status === "Active"
                      //     ? "success"
                      //     : order.status === "Pending"
                      //     ? "warning"
                      //     : "error"
                      // }
                    >
                      {item.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <DateVN value={item.created_at} />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <ActionProduct product={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {products?.length === 0 && (
          <div className="font-semibold text-sm text-muted-foreground text-center py-5">
            Không có sản phẩm
          </div>
        )}
      </div>
    </div>
  );
}
