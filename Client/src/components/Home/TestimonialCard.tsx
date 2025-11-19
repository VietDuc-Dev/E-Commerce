import { MessageSquareQuote, StarIcon } from "lucide-react";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export interface Props {
  name: string;
  avt: string;
  date: string;
  rating: number;
  comment: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: { type: "spring", stiffness: 200 },
      }}
    >
      <Card className="mt-16 mx-2 pb-5 cursor-pointer rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col items-center px-5 py-4 relative">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={
              testimonial.avt ||
              "https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
            }
            alt={testimonial.name}
            className="w-24 h-24 absolute -top-14 rounded-full border-2 object-cover shadow-md bg-white"
          />

          <MessageSquareQuote
            size={70}
            className="absolute text-gray-100 top-2 right-10"
          />
        </div>

        <div className="px-5 space-y-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={22}
                className={
                  index < Math.floor(Number(testimonial.rating))
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {testimonial.name}
            </h3>
            <p className="text-muted-foreground text-sm">{testimonial.date}</p>
          </div>

          <p className="text-sm leading-relaxed">{testimonial.comment}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
