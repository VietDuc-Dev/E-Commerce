import { createContext, useContext, useState, ReactNode } from "react";
import { Orders, Product } from "@/types/api.type";

type ModalContextType = {
  isModalUpdateProduct: boolean;
  product: Product | null;
  openModalUpdateProduct: (product: Product) => void;
  closeModalUpdateProduct: () => void;
  toggleModalUpdateProduct: () => void;

  isModalReviewsProduct: boolean;
  productId: string | null;
  openModalReviewsProduct: (productId: string) => void;
  closeModalReviewsProduct: () => void;
  toggleModalReviewsProduct: () => void;

  isModalDetailOrder: boolean;
  order: Orders | null;
  openModalDetailOrder: (order: Orders) => void;
  closeModalDetailOrder: () => void;
  toggleModalDetailOrder: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalUpdateProduct, setIsModalUpdateProduct] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const [isModalReviewsProduct, setIsModalReviewsProduct] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const [isModalDetailOrder, setIsModalDetailOrder] = useState(false);
  const [order, setOrder] = useState<Orders | null>(null);

  const openModalUpdateProduct = (productData: Product) => {
    setProduct(productData);
    setIsModalUpdateProduct(true);
  };
  const closeModalUpdateProduct = () => {
    setIsModalUpdateProduct(false);
    setProduct(null);
  };
  const toggleModalUpdateProduct = () => {
    setIsModalUpdateProduct((prev) => !prev);
  };

  const openModalReviewsProduct = (productId: string) => {
    setProductId(productId);
    setIsModalReviewsProduct(true);
  };
  const closeModalReviewsProduct = () => {
    setIsModalReviewsProduct(false);
    setProductId(null);
  };
  const toggleModalReviewsProduct = () => {
    setIsModalReviewsProduct((prev) => !prev);
  };

  const openModalDetailOrder = (orderData: Orders) => {
    setOrder(orderData);
    setIsModalDetailOrder(true);
  };
  const closeModalDetailOrder = () => {
    setIsModalDetailOrder(false);
    setOrder(null);
  };
  const toggleModalDetailOrder = () => {
    setIsModalDetailOrder((prev) => !prev);
  };
  return (
    <ModalContext.Provider
      value={{
        isModalUpdateProduct,
        product,
        openModalUpdateProduct,
        closeModalUpdateProduct,
        toggleModalUpdateProduct,

        isModalReviewsProduct,
        productId,
        openModalReviewsProduct,
        closeModalReviewsProduct,
        toggleModalReviewsProduct,

        isModalDetailOrder,
        order,
        openModalDetailOrder,
        closeModalDetailOrder,
        toggleModalDetailOrder,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
