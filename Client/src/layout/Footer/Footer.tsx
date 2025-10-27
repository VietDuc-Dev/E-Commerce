import Container from "@/components/Container";
import FooterTop from "./FooterTop";
import Logo from "@/components/Logo";
import { SubText, SubTitle } from "@/components/ui/text";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoriesData, quickLinksData } from "@/constant/data";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Khám phá các sản phẩm được tuyển chọn tại Shop Connect+, kết hợp
              giữa linh hoạt và tính tiện dụng để nâng tầm nhu cầu sống của bạn.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Liên kết nhanh</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    to={item?.href}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Danh mục</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    to={`/category/${item?.href}`}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Bản tin</SubTitle>
            <SubText>
              Đăng ký nhận bản tin của chúng tôi để nhận thông tin cập nhật và
              ưu đãi độc quyền
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Email của bạn" type="email" required />
              <Button className="w-full">Gửi</Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
