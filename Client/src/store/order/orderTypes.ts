interface OrderItem {
  order_item_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  image: string;
  title: string;
}

interface ShippingInfo {
  full_name: string | null;
  city: string | null;
  district: string | null;
  ward: string | null;
  addressDetail: string | null;
  phone: string | null;
}

export interface OrderProp {
  id: string;
  buyer_id: string;
  total_price: string;
  tax_price: string;
  shipping_price: string;
  order_status: string;
  paid_at: string;
  created_at: string;
  order_items: OrderItem[];
  shipping_info: ShippingInfo;
}
