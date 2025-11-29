import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/api.type";

type ModalContextType = {
  isModalUpdateProduct: boolean;
  product: Product | null;
  openModalUpdateProduct: (product: Product) => void;
  closeModalUpdateProduct: () => void;
  toggleModalUpdateProduct: () => void;
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

  return (
    <ModalContext.Provider
      value={{
        isModalUpdateProduct,
        product,
        openModalUpdateProduct,
        closeModalUpdateProduct,
        toggleModalUpdateProduct,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
