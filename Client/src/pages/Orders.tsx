import Container from "@/components/Container";
import EmptyOrders from "@/components/order/EmptyOrders";
import OrdersComponent from "@/components/order/OrdersComponent";
import { Title } from "@/components/ui/text";
import { OrderStatusEnum } from "@/constant";
import { STATUS_LABELS_FILTER } from "@/constant/orderEnum";
import { Filter, Logs } from "lucide-react";
import { useState } from "react";

const orders = [
  {
    id: "0ac667cb-dc01-4117-b276-3399d3a25a12",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "129000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Processing",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T10:27:44.891Z",
    order_items: [
      {
        order_item_id: "d6b7776d-f1c3-48d3-aafb-405beb23b1fe",
        order_id: "0ac667cb-dc01-4117-b276-3399d3a25a12",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 2,
        price: 10000,
        image:
          "https://tse3.mm.bing.net/th/id/OIP.jwO1GEyS1Z8XCLQi-7QLMAHaHa?pid=Api&P=0&h=220",
        title: "oppo",
      },
      {
        order_item_id: "35acbb75-73c6-4301-b116-39582e91d8a1",
        order_id: "0ac667cb-dc01-4117-b276-3399d3a25a12",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 1,
        price: 70000,
        image:
          "https://tse2.mm.bing.net/th/id/OIP.vcmNrfbgp6bZhxOhVitjKgHaHa?pid=Api&P=0&h=220",
        title: "samsung",
      },
    ],
    shipping_info: {
      full_name: null,
      city: null,
      district: null,
      ward: null,
      addressDetail: null,
      phone: null,
    },
  },
  {
    id: "16c2d113-81d0-48af-9c24-b3a63684d377",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "129000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Shipped",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T10:27:29.329Z",
    order_items: [
      {
        order_item_id: "4a06884d-2584-4fa5-9332-9d1443a5d1c4",
        order_id: "16c2d113-81d0-48af-9c24-b3a63684d377",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 2,
        price: 10000,
        image: "https://example.com/image1.jpg",
        title: "oppo",
      },
      {
        order_item_id: "e1b2332e-a572-48f9-af3b-e6ab9f0971a0",
        order_id: "16c2d113-81d0-48af-9c24-b3a63684d377",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 1,
        price: 70000,
        image: "https://example.com/image2.jpg",
        title: "samsung",
      },
    ],
    shipping_info: {
      full_name: null,
      city: null,
      district: null,
      ward: null,
      addressDetail: null,
      phone: null,
    },
  },
  {
    id: "2b80519f-7003-4367-a06c-7c77830fe170",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "129000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Processing",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T10:30:47.320Z",
    order_items: [
      {
        order_item_id: "7f6ab221-2cdc-4c72-8731-2c668da0ff3c",
        order_id: "2b80519f-7003-4367-a06c-7c77830fe170",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 2,
        price: 10000,
        image: "https://example.com/image1.jpg",
        title: "oppo",
      },
      {
        order_item_id: "bbc7fc95-91aa-4674-acb4-cbd1868c0108",
        order_id: "2b80519f-7003-4367-a06c-7c77830fe170",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 1,
        price: 70000,
        image: "https://example.com/image2.jpg",
        title: "samsung",
      },
    ],
    shipping_info: {
      full_name: null,
      city: null,
      district: null,
      ward: null,
      addressDetail: null,
      phone: null,
    },
  },
  {
    id: "4be9e7a1-d184-4060-b34e-c813db1be81f",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "316000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Processing",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T15:12:21.364Z",
    order_items: [
      {
        order_item_id: "f684e64d-7ba6-48c4-b5a8-96a1459cf5ad",
        order_id: "4be9e7a1-d184-4060-b34e-c813db1be81f",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 3,
        price: 70000,
        image: "https://example.com/image2.jpg",
        title: "samsung",
      },
      {
        order_item_id: "747c6113-8b1d-4487-9b86-82630d70639c",
        order_id: "4be9e7a1-d184-4060-b34e-c813db1be81f",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 5,
        price: 10000,
        image: "https://example.com/image1.jpg",
        title: "oppo",
      },
    ],
    shipping_info: {
      full_name: "ngoc hoang",
      city: "HCM",
      district: "Thu Duc",
      ward: "Hiep Binh",
      addressDetail: "123 duong so 6",
      phone: "0369467834",
    },
  },
  {
    id: "4f739a6f-d51a-4580-b9f4-364102994cfa",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "129000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Cancelled",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T10:57:57.260Z",
    order_items: [
      {
        order_item_id: "4f6e7f4f-9a82-48f2-90b7-4e5831e12698",
        order_id: "4f739a6f-d51a-4580-b9f4-364102994cfa",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 2,
        price: 10000,
        image: "https://example.com/image1.jpg",
        title: "oppo",
      },
      {
        order_item_id: "77cb5689-738d-42bd-a048-db2e6195bc96",
        order_id: "4f739a6f-d51a-4580-b9f4-364102994cfa",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 1,
        price: 70000,
        image: "https://example.com/image2.jpg",
        title: "samsung",
      },
    ],
    shipping_info: {
      full_name: "ngoc hoang",
      city: "HCM",
      district: "Thu Duc",
      ward: "Hiep Binh",
      addressDetail: "123 duong so 6",
      phone: "0369467834",
    },
  },
  {
    id: "8bbf7b82-2acc-4bdf-99f1-0f04c0017f15",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "283000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Processing",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T10:58:28.502Z",
    order_items: [
      {
        order_item_id: "3a80af70-5d99-4728-8629-44cfe990ef2a",
        order_id: "8bbf7b82-2acc-4bdf-99f1-0f04c0017f15",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 2,
        price: 10000,
        image: "https://example.com/image1.jpg",
        title: "oppo",
      },
      {
        order_item_id: "46fd8337-e442-4765-ab0e-98d33b22cb29",
        order_id: "8bbf7b82-2acc-4bdf-99f1-0f04c0017f15",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 3,
        price: 70000,
        image: "https://example.com/image2.jpg",
        title: "samsung",
      },
    ],
    shipping_info: {
      full_name: "ngoc hoang",
      city: "HCM",
      district: "Thu Duc",
      ward: "Hiep Binh",
      addressDetail: "123 duong so 6",
      phone: "0369467834",
    },
  },
  {
    id: "9d16c8d6-bf73-4507-9882-7bf2d20829ef",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "129000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Cancelled",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T10:57:24.336Z",
    order_items: [
      {
        order_item_id: "887c28d3-a75e-485f-8ba7-153e2c8e57df",
        order_id: "9d16c8d6-bf73-4507-9882-7bf2d20829ef",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 2,
        price: 10000,
        image: "https://example.com/image1.jpg",
        title: "oppo",
      },
      {
        order_item_id: "dfb0a256-b939-4acd-99d3-d3e7a52dd23a",
        order_id: "9d16c8d6-bf73-4507-9882-7bf2d20829ef",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 1,
        price: 70000,
        image: "https://example.com/image2.jpg",
        title: "samsung",
      },
    ],
    shipping_info: {
      full_name: "ngoc hoang",
      city: "HCM",
      district: "Thu Duc",
      ward: "Hiep Binh",
      addressDetail: "123 duong so 6",
      phone: "0369467834",
    },
  },
  {
    id: "fe7b8b80-e906-4e83-8b39-35943d29715c",
    buyer_id: "80a6107a-f83d-4944-938e-a0491dd14aa7",
    total_price: "129000.00",
    tax_price: "0.10",
    shipping_price: "30000.00",
    order_status: "Processing",
    paid_at: "2025-10-25T10:27:44.891Z",
    created_at: "2025-10-25T10:56:24.550Z",
    order_items: [
      {
        order_item_id: "9bb066d6-5f9e-440a-97ee-f63e4eead2ac",
        order_id: "fe7b8b80-e906-4e83-8b39-35943d29715c",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898481",
        quantity: 2,
        price: 10000,
        image: "https://example.com/image1.jpg",
        title: "oppo",
      },
      {
        order_item_id: "5251e028-3b49-47de-83a9-d89cf7d2aef4",
        order_id: "fe7b8b80-e906-4e83-8b39-35943d29715c",
        product_id: "17b1ef11-efbe-4bdb-8852-d001d3898485",
        quantity: 1,
        price: 70000,
        image: "https://example.com/image2.jpg",
        title: "samsung",
      },
    ],
    shipping_info: {
      full_name: null,
      city: null,
      district: null,
      ward: null,
      addressDetail: null,
      phone: null,
    },
  },
];

const OrderPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  const filterOrders = orders.filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter
  );

  const ORDER_STATUS = ["All", ...Object.values(OrderStatusEnum)] as const;

  if (!orders.length) {
    return (
      <div className="bg-gray-50 pb-52 md:pb-10">
        <Container>
          <EmptyOrders />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>
        <div className="flex items-center gap-2 py-5">
          <Logs className="text-darkColor" />
          <Title>Đơn hàng của bạn</Title>
        </div>

        <div className="p-4 mb-8 bg-white border rounded-2xl">
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium">Lọc trạng thái sản phẩm: </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUS.map((status) => {
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-0.5 rounded-lg font-medium transition-all hover:bg-shop_light_bg ${
                      statusFilter === status &&
                      "text-white bg-shop_light_green hover:bg-shop_light_green"
                    }`}
                  >
                    {STATUS_LABELS_FILTER[status]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <OrdersComponent orders={filterOrders} />
      </Container>
    </div>
  );
};

export default OrderPage;
