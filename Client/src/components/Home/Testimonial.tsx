import { TestimonialData } from "@/constant/data";
import { Title } from "../ui/text";
import TestimonialCard from "./TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <div className="bg-white border border-shop_light_green/20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Khách hàng nói gì?</Title>
      <div className="mt-5 mx-10">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {TestimonialData.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <TestimonialCard testimonial={item} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
