import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Award, ShoppingBag, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-14 space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Về <span className="text-shop_light_green">Chúng Tôi</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi mang đến những sản phẩm chất lượng cao, giá cả hợp lý, phục
          vụ khách hàng với trải nghiệm mua sắm trực tuyến tốt nhất.
        </p>
      </motion.div>

      {/* Company Mission */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
          alt="Mission"
          className="rounded-xl shadow-md object-cover"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Sứ mệnh của chúng tôi</h2>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi tin rằng mỗi khách hàng đều xứng đáng nhận được sản phẩm
            tốt nhất cùng dịch vụ tận tâm. Vì vậy, chúng tôi tập trung phát
            triển hệ thống cung ứng nhanh chóng, an toàn và hiệu quả.
          </p>

          <Link to={"/products"}>
            <Button className="bg-shop_light_green hover:bg-shop_dark_green text-white">
              Xem Sản Phẩm
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
      >
        <Card className="py-8">
          <CardContent className="space-y-3">
            <Users size={40} className="mx-auto text-shop_light_green" />
            <h3 className="text-2xl font-bold">12,000+</h3>
            <p className="text-gray-500">Khách hàng tin dùng</p>
          </CardContent>
        </Card>

        <Card className="py-8">
          <CardContent className="space-y-3">
            <ShoppingBag size={40} className="mx-auto text-shop_light_green" />
            <h3 className="text-2xl font-bold">2,500+</h3>
            <p className="text-gray-500">Sản phẩm chất lượng</p>
          </CardContent>
        </Card>

        <Card className="py-8">
          <CardContent className="space-y-3">
            <Award size={40} className="mx-auto text-shop_light_green" />
            <h3 className="text-2xl font-bold">5 Năm+</h3>
            <p className="text-gray-500">Kinh nghiệm phục vụ</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Tầm nhìn của chúng tôi</h2>
          <p className="text-gray-600 leading-relaxed">
            Trở thành nền tảng thương mại điện tử dẫn đầu, nơi khách hàng có thể
            yên tâm lựa chọn sản phẩm chất lượng và nhận được dịch vụ nhanh
            chóng, an toàn.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi không chỉ bán hàng — chúng tôi tạo ra trải nghiệm mua sắm
            chuyên nghiệp, thân thiện và đáng tin cậy.
          </p>

          <Button>Liên hệ chúng tôi</Button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Vision"
          className="rounded-xl shadow-md object-cover"
        />
      </motion.div>

      {/* Bottom Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-shop_light_green/10 border border-shop_light_green/30 rounded-xl p-10 text-center space-y-4"
      >
        <Rocket size={48} className="text-shop_light_green mx-auto" />
        <h2 className="text-2xl font-bold">
          Chúng tôi luôn sẵn sàng phục vụ bạn!
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Đội ngũ hỗ trợ luôn túc trực 24/7 để đảm bảo bạn có trải nghiệm tuyệt
          vời nhất khi mua sắm tại cửa hàng của chúng tôi.
        </p>

        <Button className="bg-shop_dark_green hover:bg-shop_light_green text-white">
          Liên hệ ngay
        </Button>
      </motion.div>
    </div>
  );
};

export default AboutUs;
