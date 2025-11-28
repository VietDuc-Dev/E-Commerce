import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CreateProductForm from "@/components/products/CreateProductForm";

export default function CreateProduct() {
  return (
    <>
      <PageBreadcrumb pageTitle="Thêm sản phẩm" />
      <div>
        <CreateProductForm />
      </div>
    </>
  );
}
