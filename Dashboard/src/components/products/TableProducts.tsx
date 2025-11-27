import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Badge from "../ui/badge/Badge";
import DateVN from "@/lib/date";
import { ChevronDown, Download, Loader, Plus } from "lucide-react";
import Button from "../ui/button/Button";
import ActionProduct from "./ActionProduct";
import useProductsQuery from "@/hooks/api/use-get-products";
import { Product } from "@/types/api.type";
import PriceFormatter from "@/lib/price";
import { useState, useMemo, useCallback } from "react";
import { Category } from "@/constant/data";
import { AvailabilityEnum, AvailabilityType } from "@/enum/product";

const STOCK_OPTIONS = Object.values(AvailabilityEnum);

const STOCK_LABELS: Record<AvailabilityType, string> = {
  [AvailabilityEnum.IN_STOCK]: "Sản phẩm luôn có",
  [AvailabilityEnum.LIMITED]: "Số lượng ít",
  [AvailabilityEnum.OUT_OF_STOCK]: "Hết hàng",
};

const DEFAULT_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GCMwGpqN7TCY7x1rvijcr-K66gC1D5RpLA&s";

export default function TableProducts() {
  const [page, setPage] = useState(1);
  const [filterParams, setFilterParams] = useState<{
    availability: AvailabilityType | "";
    category: string;
    search: string;
  }>({
    availability: "",
    category: "",
    search: "",
  });

  const filters = useMemo(
    () => ({
      ...filterParams,
      availability: filterParams.availability || undefined,
      page,
    }),
    [filterParams, page]
  );

  const { data, isPending } = useProductsQuery(filters);

  const totalPage = data?.pagination?.totalPage || 1;
  const products: Product[] = useMemo(
    () => data?.products || [],
    [data?.products]
  );

  const handleFilterChange = useCallback(
    (updates: Partial<typeof filterParams>) => {
      setFilterParams((prev) => ({ ...prev, ...updates }));
      setPage(1);
    },
    []
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const resetFilters = useCallback(() => {
    setFilterParams({
      availability: "",
      category: "",
      search: "",
    });
    setPage(1);
  }, []);

  const renderPaginationItems = useMemo(() => {
    const items = [];

    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPage >= 2) {
      items.push(
        <PaginationItem key="page-2">
          <PaginationLink
            onClick={() => handlePageChange(2)}
            isActive={page === 2}
          >
            2
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (totalPage >= 3) {
      items.push(
        <PaginationItem key="page-3">
          <PaginationLink
            onClick={() => handlePageChange(3)}
            isActive={page === 3}
          >
            3
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (totalPage > 3) {
      items.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return items;
  }, [totalPage, page, handlePageChange]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {isPending && (
          <div className="flex justify-center py-8">
            <Loader className="w-8 h-8 animate-spin" />
          </div>
        )}

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

          {/* Header Search */}
          <div className="border-b border-gray-100 dark:border-white/[0.05] flex justify-between">
            <div className="hidden lg:block px-6 py-5">
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
                  value={filterParams.search}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />
              </div>
            </div>
            <div className="px-6 py-5">
              <Button variant="outline" onClick={resetFilters}>
                Xóa bộ lọc
              </Button>
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
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 flex"
                >
                  Loại{" "}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
                        aria-label="Open menu"
                      >
                        <ChevronDown size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuGroup>
                        {Category.map((item) => (
                          <DropdownMenuItem
                            key={item.value}
                            onClick={() =>
                              handleFilterChange({ category: item.value })
                            }
                          >
                            {item.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Giá
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 flex"
                >
                  Tồn kho{" "}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
                        aria-label="Open menu"
                      >
                        <ChevronDown size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuGroup>
                        {STOCK_OPTIONS.map((item) => (
                          <DropdownMenuItem
                            key={item}
                            onClick={() =>
                              handleFilterChange({ availability: item })
                            }
                          >
                            {STOCK_LABELS[item]}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-15 h-16 overflow-hidden rounded-md">
                        <img
                          width={40}
                          height={40}
                          src={item?.images[0]?.url || DEFAULT_IMAGE}
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
                    <Badge size="sm">{item.stock}</Badge>
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

          {/* Pagination */}
          {products.length > 0 && (
            <div className="border-t border-gray-100 dark:border-white/[0.05]">
              <div className="hidden lg:block px-6 py-5">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, page - 1))}
                        className={
                          page === 1 ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>

                    {renderPaginationItems}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(Math.min(totalPage, page + 1))
                        }
                        className={
                          page === totalPage
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>

        {products.length === 0 && !isPending && (
          <div className="font-semibold text-sm text-muted-foreground text-center py-5">
            Không có sản phẩm
          </div>
        )}
      </div>
    </div>
  );
}
