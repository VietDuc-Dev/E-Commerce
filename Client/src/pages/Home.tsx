import Container from "@/components/Container";
import Banner from "@/components/Home/Banner";
import ProductsGird from "@/components/Home/ProductsGird";
import HomeTabbar from "@/components/HomeTabbar";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { products } = useSelector((state: RootState) => state.product);

  return (
    <Container>
      <Banner />
      <Container className="flex flex-col lg:px-0 my-10">
        <HomeTabbar />
        <ProductsGird products={products} />
      </Container>
    </Container>
  );
}
