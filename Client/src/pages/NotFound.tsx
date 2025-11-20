import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "@/components/Container";

const NotFoundPage = () => {
  return (
    <Container className="my-10 flex flex-col items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full text-center shadow-lg border ">
          <CardContent className="py-10">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-7xl font-bold text-primary"
            >
              404
            </motion.h1>

            <h2 className="text-2xl font-semibold mt-4">
              Trang bạn tìm không tồn tại
            </h2>

            <p className="text-gray-500 mt-2">
              Có vẻ như trang bạn đang cố truy cập không tồn tại hoặc đã bị xóa.
            </p>

            <Link to="/" className="inline-block mt-6">
              <Button className="flex items-center gap-2">
                <MoveLeft size={18} />
                Quay lại trang chủ
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default NotFoundPage;
