import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Homeowner, Skyline Residences",
    text: "NLV made our dream home a reality. The attention to detail and quality of construction is unmatched. We couldn't be happier with our new home.",
    rating: 5,
  },
  {
    name: "Rajesh Mehta",
    role: "Investor, Palm Vista",
    text: "Exceptional ROI and world-class amenities. NLV's properties are a benchmark in luxury real estate. Highly recommend for serious investors.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Homeowner, The Grand Penthouse",
    text: "From the first visit to handing over the keys, NLV's team was professional and caring. The penthouse exceeded all our expectations.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 px-6">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-accent font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          Testimonials
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
          What Our Clients Say
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-popover rounded-2xl p-8 shadow-card hover:shadow-luxury transition-all duration-300 relative"
          >
            <Quote size={32} className="text-accent/30 absolute top-6 right-6" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={16} className="fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground font-sans leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-serif font-bold text-accent">
                {t.name[0]}
              </div>
              <div>
                <p className="font-sans font-semibold text-foreground text-sm">{t.name}</p>
                <p className="font-sans text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
