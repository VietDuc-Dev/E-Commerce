import Container from "@/components/Container";
import Banner from "@/components/Home/Banner";
import NewProducts from "@/components/Home/NewProducts";
import HomeTabbar from "@/components/HomeTabbar";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { newProducts } = useSelector((state: RootState) => state.product);
  console.log(newProducts);

  return (
    <Container>
      <Banner />
      <Container className="flex flex-col lg:px-0 my-10">
        <HomeTabbar />
        <NewProducts products={newProducts} />
      </Container>
    </Container>
  );
}
