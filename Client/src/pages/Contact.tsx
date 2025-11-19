import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-14 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Liên hệ <span className="text-shop_light_green">Chúng Tôi</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Đừng ngần ngại! Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy gửi cho
          chúng tôi câu hỏi, góp ý hoặc phản hồi của bạn.
        </p>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="py-8">
          <CardContent className="space-y-3 text-center">
            <Phone size={40} className="mx-auto text-shop_light_green" />
            <h3 className="text-xl font-semibold">Hotline</h3>
            <p className="text-gray-600">+84 386 631 531</p>
          </CardContent>
        </Card>

        <Card className="py-8">
          <CardContent className="space-y-3 text-center">
            <Mail size={40} className="mx-auto text-shop_light_green" />
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-gray-600">levietduc.dev@gmail.com</p>
          </CardContent>
        </Card>

        <Card className="py-8">
          <CardContent className="space-y-3 text-center">
            <MapPin size={40} className="mx-auto text-shop_light_green" />
            <h3 className="text-xl font-semibold">Địa chỉ</h3>
            <p className="text-gray-600">Hiệp Bình Chánh, Thủ đức</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Left Image */}
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Contact"
          className="rounded-xl shadow-md object-cover"
        />

        {/* Form */}
        <Card className="p-6 shadow-md">
          <CardContent className="space-y-5">
            <h2 className="text-2xl font-semibold text-center">
              Gửi tin nhắn cho chúng tôi
            </h2>

            <div className="space-y-3">
              <Input placeholder="Họ và tên" className="p-3" />
              <Input placeholder="Email" className="p-3" />
              <Input placeholder="Số điện thoại" className="p-3" />
              <Textarea placeholder="Nội dung tin nhắn..." rows={5} />

              <Button className="w-full flex items-center gap-2 bg-shop_light_green hover:bg-shop_dark_green text-white">
                <Send size={18} />
                Gửi ngay
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Google Map (Optional) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="rounded-xl overflow-hidden border shadow-md"
      >
        <iframe
          className="w-full h-100"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7838.4228729695815!2d106.71952107480517!3d10.795111889354835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c2f8f30911%3A0x36ac5073f8c91acd!2sLandmark%2081!5e0!3m2!1svi!2sus!4v1763578643526!5m2!1svi!2sus"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactPage;
